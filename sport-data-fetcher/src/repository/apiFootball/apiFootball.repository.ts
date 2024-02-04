import { IFootballRepository } from '../../app/domain/ports/football.repository.interface';
import { Injectable } from '@nestjs/common';
import { Api, apiDataScheme, BetType, Bookmaker, TeamData } from '../../external/api-football/apiFootball';
import { Bet, Fixture, League, Team } from '../../app/domain/football';
import { AxiosResponse } from 'axios';
import { ApiFootballMapper } from './apiFootball.mapper';
import { ApiResponseNotFound } from '../../app/domain/errors/apirequest.error';

const timeout = (second: number) => new Promise((resolve) => setTimeout(resolve, second * 1000));

@Injectable()
export class ApiFootballRepository implements IFootballRepository {
  leaguesId = new Map<League, number>([
    [League.LIGUE1, 61],
    [League.LIGA, 140],
    [League.BL, 78],
    [League.SERIEA, 135],
    [League.PL, 39],
  ]);

  apiFootball: Api<unknown> = new Api({ headers: { 'x-rapidapi-key': process.env.API_FOOTBALL_KEY } });

  apiFootMapper = new ApiFootballMapper();

  async getTeams(league: League, season: number): Promise<Team[]> {
    return this.apiFootball.teams
      .getTeams({ league: this.leaguesId.get(league), season })
      .then((r) => this.getResponseOrReject<TeamData[]>(r))
      .then((r) => this.apiFootMapper.teamsDataToDomain(r));
  }

  async getIncomingFixtures(league: League, season: number): Promise<Fixture[]> {
    const today = new Date();
    const from = today.toISOString().split('T')[0];
    const timestamp = today.setFullYear(today.getFullYear() + 1);
    const to = new Date(timestamp).toISOString().split('T')[0];
    return this.apiFootball.fixtures
      .getFixtures({ league: this.leaguesId.get(league), season, from, to })
      .then((r) => this.getResponseOrReject(r))
      .then((r) => this.apiFootMapper.fixturesDataToDomain(r));
  }

  async getTodayFixtures(league: League, season: number): Promise<Fixture[]> {
    const dateString = new Date().toISOString().split('T')[0];
    return this.apiFootball.fixtures
      .getFixtures({ league: this.leaguesId.get(league), season, date: dateString })
      .then((r) => this.getResponseOrReject(r))
      .then((r) => this.apiFootMapper.fixturesDataToDomain(r));
  }

  async getOdds(league: League, season: number, bookmaker: Bookmaker, bet: BetType): Promise<Bet[]> {
    const bets: Bet[] = [];
    let page = 0;
    let totalPage: number;
    do {
      page++;
      const b = await this.apiFootball.odds
        .getOdds({ league: this.leaguesId.get(league), season, bookmaker, bet, page })
        .then((r) => {
          page = r?.data?.paging?.current;
          totalPage = r?.data?.paging?.total;
          return r;
        })
        .then((r) => this.getResponseOrReject(r))
        .then((r) => this.apiFootMapper.oddsDataToDomain(r));

      bets.push(...b);
      await timeout(61);
    } while (page && totalPage && page < totalPage);

    return bets;
  }

  private getResponseOrReject<T = any>(axiosResponse: AxiosResponse<apiDataScheme>): Promise<T> {
    console.log(JSON.stringify(axiosResponse.data));
    if (!axiosResponse?.data?.response) {
      return Promise.reject(new ApiResponseNotFound());
    }
    if (!axiosResponse?.data?.errors || axiosResponse?.data?.errors?.length === 0) {
      return axiosResponse.data.response;
    } else {
      return Promise.reject(axiosResponse.data.errors);
    }
  }
}
