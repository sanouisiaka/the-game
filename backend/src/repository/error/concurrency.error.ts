export class ConcurrencyError {
  private readonly _message: string;

  public constructor(message: string) {
    this._message = message;
  }

  get message(): string {
    return this._message;
  }
}
