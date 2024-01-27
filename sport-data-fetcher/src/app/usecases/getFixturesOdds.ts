import { Inject, Injectable, Logger } from '@nestjs/common';
import { IFootballRepository } from '../domain/ports/football.repository.interface';
import { ClientProxy } from '@nestjs/microservices';
import { League } from '../domain/football';
import { BetType, Bookmaker } from '../../external/api-football/apiFootball';
import { Handler } from '../../config/handler';
import { FootRequestModel } from './model/footRequestModel';

@Injectable()
export class GetFixturesOdds implements Handler<FootRequestModel> {
  constructor(
    @Inject('FOOT_DATA_SERVICE') private client: ClientProxy,
    @Inject(IFootballRepository) private readonly footballRepository: IFootballRepository,
  ) {}

  private readonly logger = new Logger(GetFixturesOdds.name);

  handle(request: FootRequestModel) {
    Object.values(League).map((league) => {
      this.footballRepository
        .getOdds(league, request.season, Bookmaker.UNIBET, BetType.WINNER)
        .then((bets) => {
          this.logger.log(bets.length + 'to update in' + league);
          bets.forEach((bet) => {
            this.client.emit('BETS', bet);
            this.logger.log('new BETS event emitted ' + JSON.stringify(bet));
          });
        })
        .catch((e) => {
          this.logger.error('error in retrieving odds for league' + league + '\n' + JSON.stringify(e));
          this.logger.error(JSON.stringify(e));
        });
    });
  }
}
