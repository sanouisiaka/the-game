import { DomainError } from '../../domain.error';

export class UserNotFound extends DomainError {
  constructor() {
    super('User not found');
  }
}
