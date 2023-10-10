export class DomainError {

  protected label: string;
  protected message: string;

  public getLabel(): string {
    return this.label;
  }

  public getMessage(): string {
    return this.message;
  }

  protected constructor(label: string, message: string) {
    this.label = label;
    this.message = message;
  }
}
