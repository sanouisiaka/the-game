import { Fixture } from '@/corelogic/domain/fixture/fixture';
import { Page } from '@/corelogic/domain/page';

export interface IFixtureRepository {
  getPaginatedFixtures(leagueId: number, from: Date, page: number, size?: number): Promise<Page<Fixture>>;

}

export type GetPaginatedFixturesParam = {
  leagueId: number,
  from: Date,
  page: number,
  size?: number
}

export const FIXTURE_REPOSITORY = Symbol('FIXTURE_REPOSITORY');
