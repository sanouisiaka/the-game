import { Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import configuration from '../../config/configuration';
import { Scheduler } from './abstractScheduler';
import { GetTeams } from '../usecases/getTeams';
import { FootRequestModel } from '../usecases/model/footRequestModel';

@Injectable()
export class GetTeamsScheduler extends Scheduler implements OnModuleInit {
  constructor(
    schedulerRegistry: SchedulerRegistry,
    private getTeams: GetTeams,
  ) {
    super(schedulerRegistry);
  }

  onModuleInit() {
    const season = configuration().api.season;
    this.addCronJob(`get_teams`, configuration().cron.getTeams, this.getTeams, { season } as FootRequestModel);
  }
}
