import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RetrieveFixturesQuery } from './retrieveFixturesQuery';
import { IFixtureRepository } from '../../../ports/fixture.repository.interface';
import { Fixture } from '../../../domain/event/fixture/fixture';
import { Page } from '../../../common/page';

@QueryHandler(RetrieveFixturesQuery)
export class RetrieveFixturesQueryHandler implements IQueryHandler<RetrieveFixturesQuery, Page<Fixture>> {
  private DEFAULT_PAGINATION_SIZE: number = 15;

  constructor(@Inject(IFixtureRepository) private readonly fixtureRepository: IFixtureRepository) {}

  async execute(query: RetrieveFixturesQuery): Promise<Page<Fixture>> {
    const paginationSize = query.size ? query.size : this.DEFAULT_PAGINATION_SIZE;
    return this.fixtureRepository.getIncomingFixtures(query.leagueId, query.from, query.page, paginationSize);
  }
}
