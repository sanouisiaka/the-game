import { League } from '../domain/league/league';

export interface ILeagueRepository {
  getLeagueByApiFootId(apiFootId: number): Promise<League | null>;

  getLeagues(): Promise<League[]>;
}

export const ILeagueRepository = Symbol('ILeagueRepository');
