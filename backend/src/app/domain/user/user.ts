import { InvalidFirstname } from './error/invalidFirstname.error';
import { InvalidLastname } from './error/invalidLastname.error';
import { InvalidEmail } from './error/invalidEmail.error';

export class User {
  private readonly id: string;
  private readonly email: string;
  private readonly firstname: string;
  private readonly lastname: string;

  private constructor(id: string, email: string, firstname: string, lastname: string) {
    this.id = id;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
  }

  public static newUser(email: string, firstname: string, lastname: string): User {
    return this.build(undefined, email, firstname, lastname);
  }

  public static build(id: string, email: string, firstname: string, lastname: string): User {
    if (firstname.length <= 0) {
      throw new InvalidFirstname();
    }
    if (lastname.length <= 0) {
      throw new InvalidLastname();
    }
    if (!this.isEmailValid(email)) {
      throw new InvalidEmail();
    }

    return new User(id, email, firstname, lastname);
  }

  get _id(): string {
    return this.id;
  }

  get _email(): string {
    return this.email;
  }

  get _firstname(): string {
    return this.firstname;
  }

  get _lastname(): string {
    return this.lastname;
  }

  private static isEmailValid(email: string): boolean {
    return email.length > 0 && email.includes('@') && (email.endsWith('.fr') || email.endsWith('.com'));
  }
}
