import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import configuration from '../../config/configuration';
import { Scheduler } from './abstractScheduler';
import { GetIncomingFixtures } from '../usecases/getIncomingFixtures';
import { FootRequestModel } from '../usecases/model/footRequestModel';

@Injectable()
export class GetIncomingFixturesScheduler extends Scheduler implements OnModuleInit {
  constructor(
    schedulerRegistry: SchedulerRegistry,
    private getIncomingFixtures: GetIncomingFixtures,
  ) {
    super(schedulerRegistry);
  }

  onModuleInit() {
    const season = configuration().api.season;
    this.addCronJob(`get_incoming_fixtures`, configuration().cron.getFixtures, this.getIncomingFixtures, { season } as FootRequestModel);
  }
}
