import { User } from '@/corelogic/domain/user/user'

export interface IUserRepository {
  getUser(): Promise<User>;

  createUser(name: string | undefined): Promise<User>;
}

export const USER_REPOSITORY= Symbol('USER_REPOSITORY');
