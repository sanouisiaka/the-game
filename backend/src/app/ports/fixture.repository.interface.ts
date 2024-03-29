import { Fixture } from '../domain/event/fixture/fixture';

export interface IFixtureRepository {
  getIdByApiFootId(apiFootId: number): Promise<string | undefined>;

  getFixture(id: string): Promise<Fixture | null>;

  createFixture(fixture: Fixture): Promise<string>;

  updateFixtureInfo(fixture: Fixture): Promise<Fixture>;

  updateFixtureBets(fixture: Fixture): Promise<Fixture>;
}

export const IFixtureRepository = Symbol('IFixtureRepository');
