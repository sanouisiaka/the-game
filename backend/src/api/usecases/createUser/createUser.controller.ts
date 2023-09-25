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
    try {
      await this.commandBus.execute(new CreateUserCommand(user.email, user.name, user.family_name));
      return;
    } catch (e) {
      console.log(e);
      console.log(e.constructor.name);
      throw getHttpException(e);
    }
  }
}
