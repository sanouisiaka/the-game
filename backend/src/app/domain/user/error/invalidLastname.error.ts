import { DomainError } from '../../domain.error';

export class InvalidLastname extends DomainError {
  constructor() {
    super("User's last name is not valid");
  }
}
