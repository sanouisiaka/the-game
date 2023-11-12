import { DomainError } from '../../../domain.error';

export class CannotPlayAgainstHimself extends DomainError {
  constructor() {
    super('fixture should oppose 2 different team');
  }
}
