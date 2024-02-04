import { InvalidEmail } from '../app/domain/user/error/invalidEmail.error';
import { BadRequestException, HttpException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserAlreadyCreated } from '../app/domain/user/error/userAlreadyCreated.error';
import { UserNotFound } from '../app/domain/user/error/userNotFound.error';
import { InvalidName } from '../app/domain/user/error/invalidName.error';

export function getHttpException(error): HttpException {
  if (error instanceof InvalidEmail) {
    return new BadRequestException((error as InvalidEmail).message);
  } else if (error instanceof InvalidName) {
    return new BadRequestException((error as InvalidName).message);
  } else if (error instanceof UserAlreadyCreated) {
    return new BadRequestException((error as UserAlreadyCreated).message);
  } else if (error instanceof UserNotFound) {
    return new NotFoundException((error as UserNotFound).message);
  } else {
    return new InternalServerErrorException(error);
  }
}
