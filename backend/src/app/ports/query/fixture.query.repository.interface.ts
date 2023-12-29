import { Page } from '../../queries/page';
import { FixtureDto } from '../../queries/dto/fixture';

export interface IFixtureQueryRepository {
  getIncomingFixtures(leagueId: number, before: Date, after: Date, page: number, size: number): Promise<Page<FixtureDto>>;
}

export const IFixtureQueryRepository = Symbol('IFixtureQueryRepository');
