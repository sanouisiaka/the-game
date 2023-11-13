import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RetrieveLeaguesQuery } from './retrieveLeaguesQuery';
import { ILeagueRepository } from '../../../ports/league.repository.interface';
import { League } from '../../../domain/league/league';

@QueryHandler(RetrieveLeaguesQuery)
export class RetrieveLeaguesQueryHandler implements IQueryHandler<RetrieveLeaguesQuery, League[]> {
  constructor(@Inject(ILeagueRepository) private readonly leagueRepository: ILeagueRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: RetrieveLeaguesQuery): Promise<League[]> {
    return this.leagueRepository.getLeagues().then((leagues) => {
      if (!leagues) {
        return [];
      }
      return leagues;
    });
  }
}
