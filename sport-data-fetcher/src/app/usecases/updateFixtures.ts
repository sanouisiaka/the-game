import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IFootballRepository } from '../domain/ports/football.repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import { League } from '../domain/football.contract';

@Injectable()
export class UpdateFixtures {
  constructor(
    @Inject('FOOT_DATA_SERVICE') private client: ClientProxy,
    @Inject(IFootballRepository) private readonly footballRepository: IFootballRepository,
  ) {}

  private readonly logger = new Logger(UpdateFixtures.name);

  @Cron('0 * * * *') // every hour
  updateFixtures() {
    Object.values(League).map((league) => {
      this.footballRepository.getTodayFixtures(league).then((fixture) => {
        this.client.emit('FIXTURE', JSON.stringify(fixture));
        this.logger.log('new fixture event emitted ' + JSON.stringify(fixture));
      });
    });
  }
}