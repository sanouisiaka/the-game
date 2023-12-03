import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { getHttpException } from '../../DomainToHttpException';
import { AuthGuard } from '../../auth.guard';
import { RetrieveFixturesQuery } from '../../../app/queries/usecases/retrieveFixtures/retrieveFixturesQuery';
import { Page } from '../../../app/queries/page';
import { FixtureQuery } from './fixture.query';
import { FixtureDto } from '../../../app/queries/dto/fixture';
import { PageDto } from './page.dto';

@Controller()
@UseGuards(AuthGuard)
export class RetrieveFixturesController {
  constructor(private queryBus: QueryBus) {}

  @Get('/fixtures')
  async getFixtures(@Query() queryParams: FixtureQuery): Promise<PageDto<FixtureDto>> {
    return this.queryBus
      .execute(new RetrieveFixturesQuery(queryParams.leagueId, queryParams.from, queryParams.page, queryParams.size))
      .then((page: Page<FixtureDto>) => new PageDto(page.data, page.meta.page, page.meta.total))
      .catch((e) => {
        throw getHttpException(e);
      });
  }
}
