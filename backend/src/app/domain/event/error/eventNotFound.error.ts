import { DomainError } from '../../domain.error';

export class EventNotFound extends DomainError {
  constructor(id: string) {
    super('event ' + id + ' does not exist');
  }
}
