import { DomainError } from '../../../domain.error';
import { Bet } from '../bet';

export class MultipleWinnerBet extends DomainError {
  constructor(evenId: string, bets: Bet[]) {
    super('there can only be one winner bet for event' + evenId + ' bets: ' + JSON.stringify(bets));
  }
}
