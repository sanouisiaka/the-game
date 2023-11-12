import { DomainError } from '../../../domain.error';

export class IncorrectOdd extends DomainError {
  constructor() {
    super('an odd should not be negative. Or else what is the point !');
  }
}
