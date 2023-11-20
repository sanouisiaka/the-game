import { Team } from '../domain/team/team';

export interface ITeamRepository {
  getTeamByApiFootId(apiFootId: number): Promise<Team | null>;

  createTeam(fixture: Team): Promise<number>;
}

export const ITeamRepository = Symbol('ITeamRepository');
