import { Fixture } from '../domain/fixture/fixture';

export interface IFixtureRepository {
  getIdByApiFootId(apiFootId: number): Promise<string>;

  getFixture(id: string): Promise<Fixture | null>;

  createFixture(fixture: Fixture): Promise<Fixture>;

  updateFixtureInfo(fixture: Fixture): Promise<Fixture>;
}

export const IFixtureRepository = Symbol('IFixtureRepository');
