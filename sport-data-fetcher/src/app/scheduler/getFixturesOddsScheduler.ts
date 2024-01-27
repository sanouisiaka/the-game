import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import configuration from '../../config/configuration';
import { Scheduler } from './abstractScheduler';
import { GetFixturesOdds } from '../usecases/getFixturesOdds';
import { FootRequestModel } from '../usecases/model/footRequestModel';

@Injectable()
export class GetFixturesOddsScheduler extends Scheduler implements OnModuleInit {
  constructor(
    schedulerRegistry: SchedulerRegistry,
    private getFixturesOdds: GetFixturesOdds,
  ) {
    super(schedulerRegistry);
  }

  onModuleInit() {
    const season = configuration().api.season;
    this.addCronJob(`get_fixtures_odds`, configuration().cron.getFixturesOdds, this.getFixturesOdds, { season } as FootRequestModel);
  }
}
