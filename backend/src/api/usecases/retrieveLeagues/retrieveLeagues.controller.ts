import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { getHttpException } from '../../DomainToHttpException';
import { AuthGuard } from '../../auth.guard';
import { RetrieveLeaguesQuery } from '../../../app/queries/usecases/retrieveLeagues/retrieveLeaguesQuery';
import { LeagueDto } from './league.dto';
import { League } from '../../../app/domain/league/league';

@Controller()
@UseGuards(AuthGuard)
export class RetrieveLeaguesController {
  constructor(private queryBus: QueryBus) {}

  @Get('/leagues')
  async getLeagues(): Promise<LeagueDto[]> {
    return this.queryBus
      .execute(new RetrieveLeaguesQuery())
      .then((leagues: League[]) => leagues.map((league) => new LeagueDto(league.id, league.name, league.country, league.logoUrl)))
      .catch((e) => {
        throw getHttpException(e);
      });
  }
}
