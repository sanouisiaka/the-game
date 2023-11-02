import { DomainError } from '../../domain.error';

export class FixtureAlreadyExists extends DomainError {
  constructor(id: string) {
    super('fixture ' + id + ' already exists');
  }
}
