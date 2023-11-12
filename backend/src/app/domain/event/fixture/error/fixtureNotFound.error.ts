import { DomainError } from '../../../domain.error';

export class FixtureNotFound extends DomainError {
  constructor(id: string) {
    super('fixture ' + id + ' does not exist');
  }
}
