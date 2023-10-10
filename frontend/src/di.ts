import 'reflect-metadata';
import { container } from 'tsyringe'
import { IUserRepository, USER_REPOSITORY } from '@/corelogic/ports/user.repository.interface'
import { UserRepository } from '@/rest/user.repository'
import { AXIOS_HTTP_CLIENT, AxiosInstance, HttpClient } from '@/rest/axios.config'

export { container };

container.register<IUserRepository>(USER_REPOSITORY, { useClass: UserRepository });

container.register<HttpClient>(AXIOS_HTTP_CLIENT, { useClass: AxiosInstance });
