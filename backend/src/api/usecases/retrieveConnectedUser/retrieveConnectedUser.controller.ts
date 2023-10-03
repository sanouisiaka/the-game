import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { getHttpException } from '../../DomainToHttpException';
import { Authenticate } from '../../../config/decorators/authenticate.decorator';
import { AuthGuard, UserInfo } from '../../auth.guard';
import { RetrieveConnectedUserQuery } from '../../../app/queries/usecases/retrieveConnectedUser/retrieveConnectedUserQuery';

@Controller()
@UseGuards(AuthGuard)
export class RetrieveConnectedUserController {
  constructor(private queryBus: QueryBus) {}

  @Get('/user')
  async retrieveConnectedUser(@Authenticate() user: UserInfo): Promise<boolean> {
    return this.queryBus.execute(new RetrieveConnectedUserQuery(user.email)).catch((e) => {
      throw getHttpException(e);
    });
  }
}
