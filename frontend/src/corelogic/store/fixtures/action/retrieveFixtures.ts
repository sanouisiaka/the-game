import { container } from '@/di';
import { Fixture } from '@/corelogic/domain/fixture/fixture';
import { FIXTURE_REPOSITORY, IFixtureRepository } from '@/corelogic/ports/fixture.repository.interface';
import { Page } from '@/corelogic/domain/page';

export async function retrievePaginatedIncomingFixtures(leagueId: number, page: number, size?: number): Promise<Page<Fixture>> {
  const fixtureRepository = container.resolve<IFixtureRepository>(FIXTURE_REPOSITORY);
  return fixtureRepository.getPaginatedIncomingFixtures(leagueId, page, size);
}

export async function retrievePaginatedPastFixtures(page: number, size?: number): Promise<Page<Fixture>> {
  const fixtureRepository = container.resolve<IFixtureRepository>(FIXTURE_REPOSITORY);
  return fixtureRepository.getPaginatedPastFixtures(page, size);
}