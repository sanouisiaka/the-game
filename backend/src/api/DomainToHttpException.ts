import { InvalidEmail } from '../app/domain/user/error/invalidEmail.error';
import { BadRequestException, HttpException, InternalServerErrorException } from '@nestjs/common';
import { InvalidFirstname } from '../app/domain/user/error/invalidFirstname.error';
import { InvalidLastname } from '../app/domain/user/error/invalidLastname.error';

export function getHttpException(error): HttpException {
  if (error instanceof InvalidEmail) {
    return new BadRequestException((error as InvalidEmail).message);
  } else if (error instanceof InvalidFirstname) {
    return new BadRequestException((error as InvalidFirstname).message);
  } else if (error instanceof InvalidLastname) {
    return new BadRequestException((error as InvalidLastname).message);
  } else {
    return new InternalServerErrorException(error);
  }
}
