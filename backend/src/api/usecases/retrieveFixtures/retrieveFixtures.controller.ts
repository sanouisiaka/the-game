import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { getHttpException } from '../../DomainToHttpException';
import { AuthGuard } from '../../auth.guard';
import { FixtureDto } from './fixture.dto';
import { RetrieveFixturesQuery } from '../../../app/queries/usecases/retrieveFixtures/retrieveFixturesQuery';
import { Fixture } from '../../../app/domain/event/fixture/fixture';
import { Page } from '../../../app/common/page';
import { PageDto } from '../../../app/common/PageDto';
import { FixtureQuery } from './fixture.query';

@Controller()
@UseGuards(AuthGuard)
export class RetrieveFixturesController {
  constructor(private queryBus: QueryBus) {}

  @Get('/fixtures')
  async getLeagues(@Query() queryParams: FixtureQuery): Promise<PageDto<FixtureDto>> {
    return this.queryBus
      .execute(new RetrieveFixturesQuery(queryParams.leagueId, queryParams.from, queryParams.page, queryParams.size))
      .then((page: Page<Fixture>) => new PageDto(this.fromDomain(page.data), page.meta.page, page.meta.total))
      .catch((e) => {
        throw getHttpException(e);
      });
  }

  private fromDomain(fixtures: Fixture[]): FixtureDto[] {
    return fixtures.map((fixture) => {
      return {
        id: fixture.id,
        date: fixture.date.toDateString(),
        status: fixture.status,
        leagueId: fixture.league.id,
        winnerBets: fixture.winnerBets.map((b) => {
          return { id: b.id, option: b.option, odd: b.odd, status: b.status };
        }),
        homeTeam: { id: fixture.home_team.id, goal: fixture.home_team.goal },
        awayTeam: { id: fixture.away_team.id, goal: fixture.away_team.goal },
      };
    });
  }
}
