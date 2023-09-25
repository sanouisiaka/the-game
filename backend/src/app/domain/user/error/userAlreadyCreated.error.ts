import { DomainError } from '../../domain.error';

export class UserAlreadyCreated extends DomainError {
  constructor() {
    super('A user with the same attributes is already created');
  }
}
