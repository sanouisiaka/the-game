import { DomainError } from '../../domain.error';

export class InvalidName extends DomainError {
  constructor() {
    super("User's ame is not valid");
  }
}
