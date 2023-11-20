import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserModule } from '../../src/config/modules/createUser.module';
import { AuthGuard } from '../../src/api/auth.guard';
import { ExecutionContext, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { InvalidEmail } from '../../src/app/domain/user/error/invalidEmail.error';
import { InvalidFirstname } from '../../src/app/domain/user/error/invalidFirstname.error';
import { InvalidLastname } from '../../src/app/domain/user/error/invalidLastname.error';
import { CommandBus } from '@nestjs/cqrs';
import { createMock } from '@golevelup/ts-jest';
import * as assert from 'assert';
import { mockAuthUser } from './mock/mock.auth';

describe('createUser controller tests', () => {
  let app: INestApplication;

  const mockCommandBus = createMock<CommandBus>({
    execute(command): Promise<any> {
      return Promise.resolve(command);
    },
  });

  let isAuthenticated = true;
  const user = { email: 'willaiam@gmail.com', name: 'Will iam', family_name: 'IAM' };
  beforeEach(async () => {
    const moduleCreateUser: TestingModule = await Test.createTestingModule({
      imports: [CreateUserModule],
    })
      .overrideProvider(CommandBus)
      .useValue(mockCommandBus)
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          context.switchToHttp().getRequest().user = user;
          return mockAuthUser(isAuthenticated);
        },
      })
      .compile();

    app = moduleCreateUser.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return CREATED if the user creation succeed', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .expect(201)
      .then((response) => {
        expect(response.body.email).toEqual(user.email);
        expect(response.body.firstname).toEqual(user.name.split(' ')[0]);
        expect(response.body.lastname).toEqual(user.family_name);
      });
  });

  it('should return 401 if the user is not logged', () => {
    isAuthenticated = false;

    return request(app.getHttpServer()).post('/users').expect(401);
  });

  it('should return 400 if the user creation fail because of a wrong email', () => {
    isAuthenticated = true;
    mockCommandBus.execute.mockRejectedValueOnce(new InvalidEmail());

    return request(app.getHttpServer())
      .post('/users')
      .expect(400)
      .then((response) => {
        expect(response.body.message).toEqual(new InvalidEmail().message);
      });
  });

  it('should return 400 if the user creation fail because of a wrong firstname', () => {
    isAuthenticated = true;
    mockCommandBus.execute.mockRejectedValueOnce(new InvalidFirstname());
    return request(app.getHttpServer())
      .post('/users')
      .expect(400)
      .then((response) => {
        expect(response.body.message).toEqual(new InvalidFirstname().message);
      });
  });

  it('should return 400 if the user creation fail because of a wrong lastname', () => {
    isAuthenticated = true;
    mockCommandBus.execute.mockRejectedValueOnce(new InvalidLastname());
    return request(app.getHttpServer())
      .post('/users')
      .expect(400)
      .then((response) => {
        assert(response.body.message, new InvalidLastname().message);
      });
  });

  it('should return 500 if another error occurred during the users creation', () => {
    isAuthenticated = true;
    mockCommandBus.execute.mockRejectedValueOnce('unknown exception');
    return request(app.getHttpServer()).post('/users').expect(500);
  });
});
