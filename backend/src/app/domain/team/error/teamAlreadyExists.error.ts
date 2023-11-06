import { DomainError } from '../../domain.error';

export class TeamAlreadyExists extends DomainError {
  constructor(apiFootId: number) {
    super('team with the api foot id' + apiFootId + ' already exists');
  }
}
