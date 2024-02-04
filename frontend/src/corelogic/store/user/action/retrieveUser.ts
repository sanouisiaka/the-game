import { IUserRepository, USER_REPOSITORY } from '@/corelogic/ports/user.repository.interface'
import { DomainError } from '@/corelogic/domain/errors/domain.error'
import { UserNotFoundError } from '@/corelogic/domain/user/errors/userNotFound.error'
import { User } from '@/corelogic/domain/user/user'
import { container } from '@/di'

export async function retrieveUser(name: string | undefined): Promise<User> {
  const userRepository = container.resolve<IUserRepository>(USER_REPOSITORY);
  return userRepository.getUser()
    .then((u) => {
      return u;
    })
    .catch((err: DomainError) => {
      if (err instanceof UserNotFoundError) {
        return userRepository.createUser(name)
          .catch((e: DomainError) => {
            throw e;
          })
      }
      throw err;
    })
}