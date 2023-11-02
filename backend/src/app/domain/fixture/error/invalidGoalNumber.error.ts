import { DomainError } from '../../domain.error';

export class InvalidGoalNumber extends DomainError {
  constructor() {
    super('A goal score should be positive');
  }
}
