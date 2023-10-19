import { Inject, Injectable, Logger } from '@nestjs/common';
import { IFootballRepository } from '../domain/ports/football.repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import { League } from '../domain/football.contract';
import { BetType, Bookmaker } from '../../external/api-football/apiFootball';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class GetFixturesOdds {
  constructor(
    @Inject('FOOT_DATA_SERVICE') private client: ClientProxy,
    @Inject(IFootballRepository) private readonly footballRepository: IFootballRepository,
  ) {}

  private readonly logger = new Logger(GetFixturesOdds.name);

  @Cron('0 */3 * * *') // every three hour
  getOdds() {
    Object.values(League).map((league) => {
      this.footballRepository.getOdds(league, new Date().getFullYear(), Bookmaker.UNIBET, BetType.WINNER).then((bets) => {
        bets.forEach((bet) => {
          this.client.emit('BET', JSON.stringify(bet));
          this.logger.log('new BET event emitted ' + JSON.stringify(bet));
        });
      });
    });
  }
}
