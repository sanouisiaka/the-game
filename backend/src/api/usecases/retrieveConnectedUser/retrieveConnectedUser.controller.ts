import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
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

  private readonly logger = new Logger(RetrieveConnectedUserController.name);

  @Get('/users')
  async retrieveConnectedUser(@Authenticate() user: UserInfo): Promise<User> {
    this.logger.log('new request GET /users: \n' + JSON.stringify(user));

    return this.queryBus.execute(new RetrieveConnectedUserQuery(user.email)).catch((e) => {
      throw getHttpException(e);
    });
  }
}
