import { Fixture } from '@/corelogic/domain/fixture/fixture';
import { Page } from '@/corelogic/domain/page';

export interface IFixtureRepository {
  getPaginatedIncomingFixtures(leagueId: number, page: number, size?: number): Promise<Page<Fixture>>;

  getPaginatedPastFixtures(page: number, size?: number): Promise<Page<Fixture>>;

}

export type GetPaginatedFixturesParam = {
  leagueId: number,
  page: number,
  size?: number
}

export const FIXTURE_REPOSITORY = Symbol('FIXTURE_REPOSITORY');
