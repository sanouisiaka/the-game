export abstract class DomainError {
  private readonly _message: string;

  protected constructor(message: string) {
    this._message = message;
  }

  get message(): string {
    return this._message;
  }
}
