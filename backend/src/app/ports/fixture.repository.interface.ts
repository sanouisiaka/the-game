import { Fixture } from '../domain/event/fixture/fixture';
import { Page } from '../common/page';

export interface IFixtureRepository {
  getIdByApiFootId(apiFootId: number): Promise<string>;

  getFixture(id: string): Promise<Fixture | null>;

  getIncomingFixtures(leagueId: number, from: Date, page: number, size: number): Promise<Page<Fixture>>;

  createFixture(fixture: Fixture): Promise<Fixture>;

  updateFixtureInfo(fixture: Fixture): Promise<Fixture>;

  updateFixtureBets(fixture: Fixture): Promise<Fixture>;
}

export const IFixtureRepository = Symbol('IFixtureRepository');
