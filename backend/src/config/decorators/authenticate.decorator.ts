import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInfo } from '../../api/auth.guard';

export const Authenticate = createParamDecorator<UserInfo>(async (data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
