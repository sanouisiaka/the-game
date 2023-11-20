import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    return this.verify(token)
      .then((user) => (request.user = user))
      .then(() => true)
      .catch(() => {
        return false;
      });
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async verify(token: string): Promise<UserInfo> {
    const client = new OAuth2Client();

    return await client
      .verifyIdToken({
        idToken: token,
        audience: this.configService.get('GOOGLE_AUTH_CLIENT_ID'),
      })
      .then((ticket) => ticket.getPayload() as UserInfo);
    // const payload = ticket.getPayload();
    // console.log(payload);
  }
}

export interface UserInfo {
  email: string;
  name: string;
  family_name: string;
}
