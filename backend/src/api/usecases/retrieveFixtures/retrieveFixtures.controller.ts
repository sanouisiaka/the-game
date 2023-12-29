import { Controller, Get, Logger, Query, UseGuards, ValidationPipe } from '@nestjs/common';
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

  private readonly logger = new Logger(RetrieveFixturesController.name);

  @Get('/fixtures')
  async getFixtures(@Query(new ValidationPipe({ transform: true })) queryParams: FixtureQuery): Promise<PageDto<FixtureDto>> {
    this.logger.log('new request GET /fixtures: \n' + JSON.stringify(queryParams));

    return this.queryBus
      .execute(new RetrieveFixturesQuery(queryParams.leagueId, queryParams.before, queryParams.after, queryParams.page, queryParams.size))
      .then((page: Page<FixtureDto>) => new PageDto(page.data, page.meta.page, page.meta.totalPage, page.meta.total))
      .catch((e) => {
        this.logger.error(e);
        throw getHttpException(e);
      });
  }
}
