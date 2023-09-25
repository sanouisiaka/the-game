import { DomainError } from '../../domain.error';

export class InvalidFirstname extends DomainError {
  constructor() {
    super("The user's first name is not valid");
  }
}
