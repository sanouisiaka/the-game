import { Bet, Fixture, League, Team } from '../football';
import { BetType, Bookmaker } from '../../../external/api-football/apiFootball';

export interface IFootballRepository {
  getIncomingFixtures(league: League, season: number): Promise<Fixture[]>;

  getTodayFixtures(league: League, season: number): Promise<Fixture[]>;

  getTeams(league: League, season: number): Promise<Team[]>;

  getOdds(league: League, season: number, bookmaker: Bookmaker, bet: BetType): Promise<Bet[]>;
}

export const IFootballRepository = Symbol('IFootballRepository');
