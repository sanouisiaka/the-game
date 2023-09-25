import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserCommandHandler } from '../../src/app/commands/usecases/createUser/createUser.command.handler';
import { CreateUserCommand } from '../../src/app/commands/usecases/createUser/createUserCommand';
import { CreateUserModule } from '../../src/config/modules/createUser.module';
import { PrismaService } from '../../src/config/prisma.service';
import { User } from '@prisma/client';
import { UserAlreadyCreated } from '../../src/app/domain/user/error/userAlreadyCreated.error';
import { DomainError } from '../../src/app/domain/domain.error';
import { InvalidEmail } from '../../src/app/domain/user/error/invalidEmail.error';
import { InvalidLastname } from '../../src/app/domain/user/error/invalidLastname.error';
import { InvalidFirstname } from '../../src/app/domain/user/error/invalidFirstname.error';

const feature = loadFeature('./test/acceptance/features/createUser.feature');

defineFeature(feature, (test) => {
  let createUserCommandHandler: CreateUserCommandHandler;
  let prisma: PrismaService;

  let handlerError: DomainError;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CreateUserModule],
    }).compile();

    createUserCommandHandler = await app.resolve(CreateUserCommandHandler);
    prisma = await app.resolve(PrismaService);
  });

  const givenTheEmailIsNotUse = (given) => {
    given(/the email "(.*)" is not use/, async (email: string) => {
      await prisma.user.deleteMany({ where: { email } });
    });
  };

  const whenICreateAUser = (when) => {
    when(/I create a user "(.*)" "(.*)" with email "(.*)"/, async (firstname: string, lastname: string, email: string) => {
      const createUserCommand: CreateUserCommand = new CreateUserCommand(email, firstname, lastname);
      return createUserCommandHandler.execute(createUserCommand).catch((e) => {
        handlerError = e;
        return Promise.resolve();
      });
    });
  };

  const thenTheUserIsCorrectlyCreated = (then) => {
    then(/the user "(.*)" with email "(.*)" is created/, async (name: string, email: string) => {
      const names = name.split(' ');
      const user: User = await prisma.user.findUnique({ where: { email } });

      expect(user).not.toBeNull();
      expect(user).not.toBeUndefined();
      expect(user.id).not.toBeNull();
      expect(user.email).toEqual(email);
      expect(user.firstname).toEqual(names[0]);
      expect(user.lastname).toEqual(names[1]);
      expect(user.createdAt).not.toBeNull();
    });
  };

  test('Creating a user successfully', ({ given, when, then }) => {
    givenTheEmailIsNotUse(given);

    whenICreateAUser(when);

    thenTheUserIsCorrectlyCreated(then);
  });

  test('Creating a user fail because the email is already use', ({ given, when, then }) => {
    given(/the email "(.*)" is taken/, async (email: string) => {
      return prisma.user.create({ data: { email, firstname: 'a', lastname: 'user' } }).catch(() => Promise.resolve());
    });

    whenICreateAUser(given);

    then(/the user creation fail because the email already exists/, () => {
      expect(handlerError).not.toBeNull();
      expect(handlerError).not.toBeUndefined();
      expect(handlerError instanceof UserAlreadyCreated).toBeTruthy();
    });
  });
  test('Creating a user fail because the email is wrong', ({ given, when, then }) => {
    givenTheEmailIsNotUse(given);

    whenICreateAUser(given);

    then(/the user creation fail because the email not correct/, () => {
      expect(handlerError).not.toBeNull();
      expect(handlerError).not.toBeUndefined();
      expect(handlerError instanceof InvalidEmail).toBeTruthy();
    });
  });

  test('Creating a user fail because the user has no lastname', ({ given, when, then }) => {
    givenTheEmailIsNotUse(given);

    whenICreateAUser(given);

    then(/the user creation fail because the user has no lastname/, () => {
      expect(handlerError).not.toBeNull();
      expect(handlerError).not.toBeUndefined();
      expect(handlerError instanceof InvalidLastname).toBeTruthy();
    });
  });

  test('Creating a user fail because the user has no firstname', ({ given, when, then }) => {
    givenTheEmailIsNotUse(given);

    whenICreateAUser(given);

    then(/the user creation fail because the user has no firstname/, () => {
      expect(handlerError).not.toBeNull();
      expect(handlerError).not.toBeUndefined();
      expect(handlerError instanceof InvalidFirstname).toBeTruthy();
    });
  });
});
