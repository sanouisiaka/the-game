import { Inject, Injectable, Logger } from '@nestjs/common';
import { IFootballRepository } from '../domain/ports/football.repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import { League } from '../domain/football';
import { Handler } from '../../config/handler';
import { FootRequestModel } from './model/footRequestModel';

@Injectable()
export class GetIncomingFixtures implements Handler<FootRequestModel> {
  constructor(
    @Inject('FOOT_DATA_SERVICE') private client: ClientProxy,
    @Inject(IFootballRepository) private readonly footballRepository: IFootballRepository,
  ) {}

  private readonly logger = new Logger(GetIncomingFixtures.name);

  handle(request: FootRequestModel) {
    Object.values(League).map((league) => {
      this.footballRepository
        .getIncomingFixtures(league, request.season)
        .then((fixtures) => {
          this.logger.log(fixtures.length + 'incoming fixtures in ' + league);
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
