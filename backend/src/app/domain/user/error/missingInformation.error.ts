import { DomainError } from '../../domain.error';

export class MissingInformation extends DomainError {
  constructor(field: string) {
    super('The ' + field + ' field should not be empty');
  }
}
