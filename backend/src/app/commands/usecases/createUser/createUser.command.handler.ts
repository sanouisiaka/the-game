import { CreateUserCommand } from './createUserCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../../../ports/user.repository.interface';
import { User } from '../../../domain/user/user';
import { UserAlreadyCreated } from '../../../domain/user/error/userAlreadyCreated.error';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, User> {
  constructor(@Inject(IUserRepository) private readonly userRepository: IUserRepository) {}

  execute(command: CreateUserCommand): Promise<User> {
    return this.userRepository.getUser(command.email).then((userFromDb) => {
      if (userFromDb) {
        throw new UserAlreadyCreated();
      }
      return this.userRepository.createUser(User.newUser(command.email, command.firstname, command.lastname));
    });
  }
}
