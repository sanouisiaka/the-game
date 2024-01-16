import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IFootballRepository } from '../domain/ports/football.repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import { League } from '../domain/football';

@Injectable()
export class GetTeams {
  constructor(
    @Inject('FOOT_DATA_SERVICE') private client: ClientProxy,
    @Inject(IFootballRepository) private readonly footballRepository: IFootballRepository,
  ) {}

  private readonly logger = new Logger(GetTeams.name);

  @Cron('0 0 * * 0') // one a week
  getTeams() {
    Object.values(League).map((league) => {
      this.footballRepository
        .getTeams(league, new Date().getFullYear())
        .then((teams) => {
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
