import { Inject, Injectable, Logger } from '@nestjs/common';
import { IFootballRepository } from '../domain/ports/football.repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import { League } from '../domain/football';
import { Handler } from '../../config/handler';
import { FootRequestModel } from './model/footRequestModel';

@Injectable()
export class GetTeams implements Handler<FootRequestModel> {
  constructor(
    @Inject('FOOT_DATA_SERVICE') private client: ClientProxy,
    @Inject(IFootballRepository) private readonly footballRepository: IFootballRepository,
  ) {}

  private readonly logger = new Logger(GetTeams.name);

  handle(request: FootRequestModel) {
    Object.values(League).map((league) => {
      this.footballRepository
        .getTeams(league, request.season)
        .then((teams) => {
          this.logger.log(teams.length + 'teams received in ' + league);
          teams.forEach((team) => {
            this.client.emit('TEAM', team);
            this.logger.log('new team event emitted ' + JSON.stringify(team));
          });
        })
        .catch((e) => {
          this.logger.error('error in retrieving teams for league' + league + '\n' + JSON.stringify(e));
          this.logger.error(JSON.stringify(e));
        });
    });
  }
}
