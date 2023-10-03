import { InvalidEmail } from '../app/domain/user/error/invalidEmail.error';
import { BadRequestException, HttpException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InvalidFirstname } from '../app/domain/user/error/invalidFirstname.error';
import { InvalidLastname } from '../app/domain/user/error/invalidLastname.error';
import { UserAlreadyCreated } from '../app/domain/user/error/userAlreadyCreated.error';
import { UserNotFound } from '../app/domain/user/error/userNotFound.error';

export function getHttpException(error): HttpException {
  if (error instanceof InvalidEmail) {
    return new BadRequestException((error as InvalidEmail).message);
  } else if (error instanceof InvalidFirstname) {
    return new BadRequestException((error as InvalidFirstname).message);
  } else if (error instanceof InvalidLastname) {
    return new BadRequestException((error as InvalidLastname).message);
  } else if (error instanceof UserAlreadyCreated) {
    return new BadRequestException((error as UserAlreadyCreated).message);
  } else if (error instanceof UserNotFound) {
    return new NotFoundException((error as UserNotFound).message);
  } else {
    return new InternalServerErrorException(error);
  }
}
