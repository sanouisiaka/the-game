import { Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../app/commands/usecases/createUser/createUserCommand';
import { getHttpException } from '../../DomainToHttpException';
import { Authenticate } from '../../../config/decorators/authenticate.decorator';
import { AuthGuard, UserInfo } from '../../auth.guard';
import { User } from '../../../app/domain/user/user';

@Controller()
@UseGuards(AuthGuard)
export class CreateUserController {
  constructor(private commandBus: CommandBus) {}

  @Post('/users')
  async createUser(@Authenticate() user: UserInfo): Promise<User> {
    const first_name = user.name.split(' ')[0];
    return this.commandBus.execute(new CreateUserCommand(user.email, first_name, user.family_name)).catch((e) => {
      throw getHttpException(e);
    });
  }
}
