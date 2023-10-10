import { User } from '@/corelogic/domain/user'

export interface IUserRepository {
  getUser(): Promise<User>;

  createUser(): Promise<User>;
}

export const USER_REPOSITORY= Symbol('USER_REPOSITORY');
