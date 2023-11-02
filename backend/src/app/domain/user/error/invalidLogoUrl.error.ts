import { DomainError } from '../../domain.error';

export class InvalidLogoUrlError extends DomainError {
  constructor(logoUrl: string) {
    super('the logo url ' + logoUrl + 'provide is malformated');
  }
}
