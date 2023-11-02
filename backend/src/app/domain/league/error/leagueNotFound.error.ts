import { DomainError } from '../../domain.error';

export class LeagueNotFound extends DomainError {
  constructor(apiFootId: number) {
    super('league with the api foot id ' + apiFootId + ' does not exist');
  }
}
