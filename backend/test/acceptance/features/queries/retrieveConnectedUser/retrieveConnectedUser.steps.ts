import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../../src/config/prisma.service';
import { DomainError } from '../../../../../src/app/domain/domain.error';
import { RetrieveConnectedUserQueryHandler } from '../../../../../src/app/queries/usecases/retrieveConnectedUser/retrieveConnectedUser.query.handler';
import { RetrieveConnectedUserModule } from '../../../../../src/config/modules/retrieveConnectedUser.module';
import { RetrieveConnectedUserQuery } from '../../../../../src/app/queries/usecases/retrieveConnectedUser/retrieveConnectedUserQuery';
import { User } from '../../../../../src/app/domain/user/user';
import { UserNotFound } from '../../../../../src/app/domain/user/error/userNotFound.error';

const feature = loadFeature('./test/acceptance/features/queries/retrieveConnectedUser/retrieveConnectedUser.feature');

defineFeature(feature, (test) => {
  let loggedUserEmail = '';
  let loggedUser: User | undefined;
  let retrieveConnectedUserQueryHandler: RetrieveConnectedUserQueryHandler;
  let prisma: PrismaService;

  let error: DomainError;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [RetrieveConnectedUserModule],
    }).compile();

    retrieveConnectedUserQueryHandler = await app.resolve(RetrieveConnectedUserQueryHandler);
    prisma = await app.resolve(PrismaService);
  });

  const whenIRetrieveTheConnectedUser = (when) => {
    when(/I retrieve the connected user/, () => {
      return retrieveConnectedUserQueryHandler
        .execute({ email: loggedUserEmail } as RetrieveConnectedUserQuery)
        .then((u) => (loggedUser = u))
        .catch((err) => {
          error = err;
          return Promise.resolve();
        });
    });
  };

  test('Retrieving the connected user successfully', ({ given, when, then }) => {
    given(/the user with email "(.*)" is logged/, async (email: string) => {
      loggedUserEmail = email;
    });

    given(/the user "(.*)" with email "(.*)" exists in BetThemAll/, async (name: string, email: string) => {
      const names = name.split(' ');
      await prisma.user.deleteMany({ where: { email } });
      await prisma.user.create({ data: { firstname: names[0], lastname: names[1], email } });
    });

    whenIRetrieveTheConnectedUser(when);

    then(/the user "(.*)" with email "(.*)" is returned/, (name: string, email: string) => {
      expect(loggedUser).not.toBeUndefined();
      expect(loggedUser._email).toEqual(email);
      expect(loggedUser._firstname).toEqual(name.split(' ')[0]);
      expect(loggedUser._lastname).toEqual(name.split(' ')[1]);
    });
  });

  test('Retrieving the connected user fail because the user does not exists in BetThemAll', ({ given, when, then }) => {
    given(/the user with email "(.*)" is logged/, async (email: string) => {
      loggedUserEmail = email;
    });

    given(/the user with email "(.*)" does not exists in BetThemAll/, async (email: string) => {
      await prisma.user.deleteMany({ where: { email } });
    });

    whenIRetrieveTheConnectedUser(when);

    then(/An error is returned because the user is not found/, () => {
      expect(error).not.toBeNull();
      expect(error).not.toBeUndefined();
      expect(error instanceof UserNotFound).toBeTruthy();
    });
  });
});
