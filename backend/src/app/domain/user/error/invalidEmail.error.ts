import { DomainError } from '../../domain.error';

export class InvalidEmail extends DomainError {
  constructor() {
    super("User's mail is not valid");
  }
}
