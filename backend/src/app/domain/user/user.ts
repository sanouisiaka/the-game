import { InvalidEmail } from './error/invalidEmail.error';
import { InvalidName } from './error/invalidName.error';

export class User {
  private readonly id: string;
  private readonly email: string;
  private readonly name: string;

  private constructor(id: string, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  public static newUser(email: string, name: string): User {
    return this.build(undefined, email, name);
  }

  public static build(id: string, email: string, name: string): User {
    if (name.length <= 0) {
      throw new InvalidName();
    }
    if (!this.isEmailValid(email)) {
      throw new InvalidEmail();
    }

    return new User(id, email, name);
  }

  get _id(): string {
    return this.id;
  }

  get _email(): string {
    return this.email;
  }

  get _name(): string {
    return this.name;
  }

  private static isEmailValid(email: string): boolean {
    return email.length > 0 && email.includes('@') && (email.endsWith('.fr') || email.endsWith('.com'));
  }
}
