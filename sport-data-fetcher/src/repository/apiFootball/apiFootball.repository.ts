import { IFootballRepository } from '../../app/domain/ports/football.repository.interface';
import { Injectable } from '@nestjs/common';
import { Api, apiDataScheme, BetType, Bookmaker, TeamData } from '../../external/api-football/apiFootball';
import { Bet, Fixture, League, Team } from '../../app/domain/football.contract';
import { AxiosResponse } from 'axios';
import { ApiFootballMapper } from './apiFootball.mapper';
import { ApiResponseNotFound } from '../../app/domain/errors/apirequest.error';

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

  async getIncomingFixtures(league: League): Promise<Fixture[]> {
    const from = new Date().toISOString().split('T')[0];
    return this.apiFootball.fixtures
      .getFixtures({ league: this.leaguesId.get(league), from })
      .then((r) => this.getResponseOrReject(r))
      .then((r) => this.apiFootMapper.fixturesDataToDomain(r));
  }

  async getTodayFixtures(league: League): Promise<Fixture[]> {
    const dateString = new Date().toISOString().split('-')[0];

    return this.apiFootball.fixtures
      .getFixtures({ league: this.leaguesId.get(league), date: dateString })
      .then((r) => this.getResponseOrReject(r))
      .then((r) => this.apiFootMapper.fixturesDataToDomain(r));
  }

  async getOdds(league: League, season: number, bookmaker: Bookmaker, bet: BetType): Promise<Bet[]> {
    return this.apiFootball.odds
      .getOdds({ league: this.leaguesId.get(league), season, bookmaker, bet })
      .then((r) => this.getResponseOrReject(r))
      .then((r) => this.apiFootMapper.oddsDataToDomain(r));
  }

  private getResponseOrReject<T = any>(axiosResponse: AxiosResponse<apiDataScheme>): Promise<T> {
    if (axiosResponse?.data?.errors && axiosResponse.data.errors.length > 0) {
      return Promise.reject(axiosResponse.data.errors);
    }
    if (!axiosResponse?.data?.response) {
      return Promise.reject(new ApiResponseNotFound());
    }
    return axiosResponse.data.response;
  }
}
