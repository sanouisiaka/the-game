import { IUserRepository } from '@/corelogic/ports/user.repository.interface'
import { User } from '@/corelogic/domain/user/user'
import { AXIOS_HTTP_CLIENT, HttpClient } from '@/rest/axios.config'

import { AxiosError, AxiosResponse } from 'axios'
import { inject, injectable } from 'tsyringe';
import { UserNotFoundError } from '@/corelogic/domain/user/errors/userNotFound.error'
import { CannotCreateUserError } from '@/corelogic/domain/user/errors/cannotCreateUser.error'

@injectable()
export class UserRepository implements IUserRepository {

  static BASE_PATH: string = '/users';

  // @ts-ignore
  constructor(@inject(AXIOS_HTTP_CLIENT) private axiosHttp: HttpClient) {
  }

  async getUser(): Promise<User> {
    return this.axiosHttp.get<AxiosResponse<User>>(UserRepository.BASE_PATH)
      .then(response => response.data as User)
      .catch((error: AxiosError) => {
        if (error.response?.status === 404) {
          throw new UserNotFoundError();
        }
        throw error;
      })
  }

  async createUser(name: string | undefined): Promise<User> {
    return this.axiosHttp.post<AxiosResponse<User>>(UserRepository.BASE_PATH, { name })
      .then(response => response.data as User)
      .catch(() => {
        throw new CannotCreateUserError();
      })
  }
}