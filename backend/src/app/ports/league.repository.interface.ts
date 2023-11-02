import { League } from '../domain/league/league';

export interface ILeagueRepository {
  getLeagueByApiFootId(apiFootId: number): Promise<League | null>;
}

export const ILeagueRepository = Symbol('ILeagueRepository');
