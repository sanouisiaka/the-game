import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../src/api/auth.guard';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { QueryBus } from '@nestjs/cqrs';
import { createMock } from '@golevelup/ts-jest';
import { RetrieveConnectedUserModule } from '../../src/config/modules/retrieveConnectedUser.module';
import { UserNotFound } from '../../src/app/domain/user/error/userNotFound.error';
import { User } from '../../src/app/domain/user/user';

describe('retrieveConnectedUser controller tests', () => {
  let app: INestApplication;

  const mockQueryBus = createMock<QueryBus>();

  let isAuthentificated = true;
  const user = { email: 'willaiam@gmail.com', name: 'Will', family_name: 'iam' };

  beforeEach(async () => {
    const moduleRetrieveConnectedUser: TestingModule = await Test.createTestingModule({
      imports: [RetrieveConnectedUserModule],
    })
      .overrideProvider(QueryBus)
      .useValue(mockQueryBus)
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          context.switchToHttp().getRequest().user = user;
          return isAuthentificated;
        },
      })
      .compile();

    app = moduleRetrieveConnectedUser.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return OK if the user retrieve user exists', async () => {
    const user = User.build('1', 'will@gmail.com', 'will', 'iam');
    mockQueryBus.execute.mockReturnValueOnce(Promise.resolve(user));

    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .then((response) => {
        expect(response.body.email).toEqual(user._email);
        expect(response.body.firstname).toEqual(user._firstname);
        expect(response.body.lastname).toEqual(user._lastname);
      });
  });

  it('should return 404 if the user creation fail because the user does not exists', () => {
    isAuthentificated = true;
    mockQueryBus.execute.mockRejectedValueOnce(new UserNotFound());

    return request(app.getHttpServer())
      .get('/user')
      .expect(404)
      .then((response) => {
        expect(response.body.message).toEqual(new UserNotFound().message);
      });
  });

  it('should return 403 if the user is not logged', () => {
    isAuthentificated = false;

    return request(app.getHttpServer()).get('/user').expect(403);
  });

  it('should return 500 if another error occured during the users creation', () => {
    isAuthentificated = true;
    mockQueryBus.execute.mockRejectedValueOnce('unknown exception');
    return request(app.getHttpServer()).get('/user').expect(500);
  });
});
