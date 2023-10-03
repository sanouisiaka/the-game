import { Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../app/commands/usecases/createUser/createUserCommand';
import { getHttpException } from '../../DomainToHttpException';
import { Authenticate } from '../../../config/decorators/authenticate.decorator';
import { AuthGuard, UserInfo } from '../../auth.guard';

@Controller()
@UseGuards(AuthGuard)
export class CreateUserController {
  constructor(private commandBus: CommandBus) {}

  @Post('/user')
  async createUser(@Authenticate() user: UserInfo): Promise<boolean> {
    const first_name = user.name.split(' ')[0];
    return this.commandBus.execute(new CreateUserCommand(user.email, first_name, user.family_name)).catch((e) => {
      throw getHttpException(e);
    });
  }
}
