import { DomainError } from '../../domain.error';

export class TeamNotFound extends DomainError {
  constructor(apiFootId: number) {
    super('team with the api foot id' + apiFootId + ' does not exist');
  }
}
