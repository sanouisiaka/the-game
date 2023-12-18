import { DomainError } from '@/corelogic/domain/errors/domain.error'

export class CannotCreateUserError extends DomainError{

  constructor() {
    super("CANNOT_CREATE_USER", "user cannot be created");
  }
}