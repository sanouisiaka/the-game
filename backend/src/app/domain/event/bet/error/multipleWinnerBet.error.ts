import { DomainError } from '../../../domain.error';

export class MultipleWinnerBet extends DomainError {
  constructor() {
    super('there can only be one winner bet for an event');
  }
}
