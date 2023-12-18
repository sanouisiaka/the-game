import { DomainError } from '@/corelogic/domain/errors/domain.error'

export class UserNotFoundError extends DomainError{

  constructor() {
    super("USER_NOT_FOUND", "user not found");
  }
}