import { container } from '@/di';
import { Fixture } from '@/corelogic/domain/fixture/fixture';
import { FIXTURE_REPOSITORY, IFixtureRepository } from '@/corelogic/ports/fixture.repository.interface';
import { Page } from '@/corelogic/domain/page';

export async function retrievePaginatedFixtures(leagueId: number, from: Date, page: number, size?: number): Promise<Page<Fixture>> {
  const fixtureRepository = container.resolve<IFixtureRepository>(FIXTURE_REPOSITORY);
  return fixtureRepository.getPaginatedFixtures(leagueId, from, page, size);
}