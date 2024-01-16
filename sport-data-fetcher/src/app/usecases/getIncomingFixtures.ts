import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IFootballRepository } from '../domain/ports/football.repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import { League } from '../domain/football';

@Injectable()
export class GetIncomingFixtures {
  constructor(
    @Inject('FOOT_DATA_SERVICE') private client: ClientProxy,
    @Inject(IFootballRepository) private readonly footballRepository: IFootballRepository,
  ) {}

  private readonly logger = new Logger(GetIncomingFixtures.name);

  @Cron('0 1 * * *') // every day at 1am
  getIncomingFixtures() {
    Object.values(League).map((league) => {
      this.footballRepository
        .getIncomingFixtures(league)
        .then((fixtures) => {
          fixtures.forEach((fixture) => {
            this.client.emit('FIXTURE', fixture);
            this.logger.log('new fixture event emitted ' + JSON.stringify(fixture));
          });
        })
        .catch((e) => {
          this.logger.error('error in retrieving incoming fixtures for league' + league + '\n' + JSON.stringify(e));
          this.logger.error(JSON.stringify(e));
        });
    });
  }
}
