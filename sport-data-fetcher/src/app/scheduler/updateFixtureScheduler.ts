import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { UpdateFixtures } from '../usecases/updateFixtures';
import configuration from '../../config/configuration';
import { Scheduler } from './abstractScheduler';
import { FootRequestModel } from '../usecases/model/footRequestModel';

@Injectable()
export class UpdateFixtureScheduler extends Scheduler implements OnModuleInit {
  constructor(
    schedulerRegistry: SchedulerRegistry,
    private updateFixtures: UpdateFixtures,
  ) {
    super(schedulerRegistry);
  }

  onModuleInit() {
    const season = configuration().api.season;
    this.addCronJob(`update_fixtures`, configuration().cron.updateFixtures, this.updateFixtures, { season } as FootRequestModel);
  }
}
