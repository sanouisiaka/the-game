import { Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Handler } from '../../config/handler';

export abstract class Scheduler {
  private readonly logger = new Logger(Scheduler.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  addCronJob(name: string, cronExpression: string, handler: Handler<any>, parameters: any) {
    const job = new CronJob(`${cronExpression}`, () => {
      handler.handle(parameters);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.log(`The cron job ${name} has been added with the following cron expression : ${cronExpression}.`);
  }
}
