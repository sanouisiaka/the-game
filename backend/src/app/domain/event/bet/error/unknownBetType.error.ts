import { DomainError } from '../../../domain.error';

export class UnknownBetType extends DomainError {
  constructor() {
    super('unknown bet type, is it a winner bet, scorer...');
  }
}
