import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../src/api/auth.guard';
import { ExecutionContext, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { createMock } from '@golevelup/ts-jest';
import { UserNotFound } from '../../src/app/domain/user/error/userNotFound.error';
import { User } from '../../src/app/domain/user/user';
import { mockAuthUser } from './mock/mock.auth';
import { ConfigModule } from '@nestjs/config';
import { RetrieveConnectedUserController } from '../../src/api/usecases/retrieveConnectedUser/retrieveConnectedUser.controller';

describe('retrieveConnectedUser controller tests', () => {
  let app: INestApplication;

  const mockQueryBus = createMock<QueryBus>();

  let isAuthenticated = true;
  const user = { email: 'willaiam@gmail.com', name: 'Will', family_name: 'iam' };

  beforeEach(async () => {
    const moduleRetrieveConnectedUser: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, ConfigModule],
      controllers: [RetrieveConnectedUserController],
    })
      .overrideProvider(QueryBus)
      .useValue(mockQueryBus)
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          context.switchToHttp().getRequest().user = user;
          return mockAuthUser(isAuthenticated);
        },
      })
      .compile();

    app = moduleRetrieveConnectedUser.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return OK if the user retrieve exists', async () => {
    const user = User.build('1', 'will@gmail.com', 'will', 'iam');
    mockQueryBus.execute.mockReturnValueOnce(Promise.resolve(user));

    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((response) => {
        expect(response.body.email).toEqual(user._email);
        expect(response.body.firstname).toEqual(user._firstname);
        expect(response.body.lastname).toEqual(user._lastname);
      });
  });

  it('should return 404 if the user does not exists', () => {
    isAuthenticated = true;
    mockQueryBus.execute.mockRejectedValueOnce(new UserNotFound());

    return request(app.getHttpServer())
      .get('/users')
      .expect(404)
      .then((response) => {
        expect(response.body.message).toEqual(new UserNotFound().message);
      });
  });

  it('should return 401 if the user is not logged', () => {
    isAuthenticated = false;

    return request(app.getHttpServer()).get('/users').expect(401);
  });

  it('should return 500 if another error occured during the user retrieving', () => {
    isAuthenticated = true;
    mockQueryBus.execute.mockRejectedValueOnce('unknown exception');
    return request(app.getHttpServer()).get('/users').expect(500);
  });
});
