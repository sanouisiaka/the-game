import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IFootballRepository } from '../domain/ports/football.repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import { League } from '../domain/football.contract';

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
      this.footballRepository.getTeams(league, new Date().getFullYear()).then((teams) => {
        teams.forEach((team) => {
          this.client.emit('TEAM', JSON.stringify(team));
          this.logger.log('new team event emitted ' + JSON.stringify(team));
        });
      });
    });
  }
}
