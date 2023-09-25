export class CreateUserCommand {
  public readonly email: string;
  public readonly firstname: string;
  public readonly lastname: string;

  constructor(email: string, firstname: string, lastname: string) {
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
