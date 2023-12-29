import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RetrieveFixturesQuery } from './retrieveFixturesQuery';
import { Page } from '../../page';
import { IFixtureQueryRepository } from '../../../ports/query/fixture.query.repository.interface';
import { FixtureDto } from '../../dto/fixture';

@QueryHandler(RetrieveFixturesQuery)
export class RetrieveFixturesQueryHandler implements IQueryHandler<RetrieveFixturesQuery, Page<FixtureDto>> {
  private DEFAULT_PAGINATION_SIZE: number = 15;

  constructor(@Inject(IFixtureQueryRepository) private readonly fixtureRepository: IFixtureQueryRepository) {}

  async execute(query: RetrieveFixturesQuery): Promise<Page<FixtureDto>> {
    const paginationSize = query.size ? query.size : this.DEFAULT_PAGINATION_SIZE;
    return this.fixtureRepository.getIncomingFixtures(query.leagueId, query.before, query.after, query.page, paginationSize);
  }
}
