import { UnauthorizedException } from '@nestjs/common';

export function mockAuthUser(isAuthenticated: boolean): boolean {
  if (isAuthenticated) {
    return true;
  }
  throw new UnauthorizedException();
}
