import { League } from '@/corelogic/domain/league/league';

export interface ILeagueRepository {
  getLeagues(): Promise<League[]>;

}

export const LEAGUE_REPOSITORY = Symbol('LEAGUE_REPOSITORY');
