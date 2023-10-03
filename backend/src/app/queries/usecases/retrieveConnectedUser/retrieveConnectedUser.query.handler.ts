import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../../../ports/user.repository.interface';
import { User } from '../../../domain/user/user';
import { Inject } from '@nestjs/common';
import { RetrieveConnectedUserQuery } from './retrieveConnectedUserQuery';
import { UserNotFound } from '../../../domain/user/error/userNotFound.error';

@QueryHandler(RetrieveConnectedUserQuery)
export class RetrieveConnectedUserQueryHandler implements IQueryHandler<RetrieveConnectedUserQuery, User> {
  constructor(@Inject(IUserRepository) private readonly userRepository: IUserRepository) {}

  execute(query: RetrieveConnectedUserQuery): Promise<User> {
    return this.userRepository.getUser(query.email).then((user) => {
      if (user) {
        return user;
      }
      throw new UserNotFound();
    });
  }
}
