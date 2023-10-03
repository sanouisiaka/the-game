import { User } from '../domain/user/user';

export interface IUserRepository {
  getUser(email: string): Promise<User | null>;

  createUser(user: User): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
