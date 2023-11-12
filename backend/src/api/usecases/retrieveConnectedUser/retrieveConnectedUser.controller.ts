import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { getHttpException } from '../../DomainToHttpException';
import { Authenticate } from '../../../config/decorators/authenticate.decorator';
import { AuthGuard, UserInfo } from '../../auth.guard';
import { RetrieveConnectedUserQuery } from '../../../app/queries/usecases/retrieveConnectedUser/retrieveConnectedUserQuery';
import { User } from '../../../app/domain/user/user';

@Controller()
@UseGuards(AuthGuard)
export class RetrieveConnectedUserController {
  constructor(private queryBus: QueryBus) {}

  @Get('/user')
  async retrieveConnectedUser(@Authenticate() user: UserInfo): Promise<User> {
    return this.queryBus.execute(new RetrieveConnectedUserQuery(user.email)).catch((e) => {
      throw getHttpException(e);
    });
  }
}
