import { Inject, Injectable, Logger } from '@nestjs/common';
import { IFootballRepository } from '../domain/ports/football.repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import { League } from '../domain/football';
import { Handler } from '../../config/handler';
import { FootRequestModel } from './model/footRequestModel';

@Injectable()
export class UpdateFixtures implements Handler<FootRequestModel> {
  constructor(
    @Inject('FOOT_DATA_SERVICE') private client: ClientProxy,
    @Inject(IFootballRepository) private readonly footballRepository: IFootballRepository,
  ) {}

  private readonly logger = new Logger(UpdateFixtures.name);

  handle(request: FootRequestModel) {
    Object.values(League).map((league) => {
      this.footballRepository
        .getTodayFixtures(league, request.season)
        .then((fixtures) => {
          this.logger.log(fixtures.length + 'fixtures to update in ' + league);
          fixtures.forEach((fixture) => {
            this.client.emit('FIXTURE', fixture);
            this.logger.log('new fixture live update event emitted for league ' + league + ' : ' + JSON.stringify(fixture));
          });
        })
        .catch((e) => {
          this.logger.error('error in updating fixtures for league ' + league + '\n' + JSON.stringify(e));
          this.logger.error(JSON.stringify(e));
        });
    });
  }
}
