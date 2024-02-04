import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
  async createUser(@Authenticate() user: UserInfo, @Body('name') name: string): Promise<User> {
    name = name ? name : 'John Doe';
    return this.commandBus.execute(new CreateUserCommand(user.email, name)).catch((e) => {
      throw getHttpException(e);
    });
  }
}
