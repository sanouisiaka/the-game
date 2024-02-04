import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../src/api/auth.guard';
import { ExecutionContext, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { InvalidEmail } from '../../src/app/domain/user/error/invalidEmail.error';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { createMock } from '@golevelup/ts-jest';
import { mockAuthUser } from './mock/mock.auth';
import { ConfigModule } from '@nestjs/config';
import { CreateUserController } from '../../src/api/usecases/createUser/createUser.controller';
import { InvalidName } from '../../src/app/domain/user/error/invalidName.error';

describe('createUser controller tests', () => {
  let app: INestApplication;

  const mockCommandBus = createMock<CommandBus>({
    execute(command): Promise<any> {
      return Promise.resolve(command);
    },
  });

  let isAuthenticated = true;
  const user = { email: 'willaiam@gmail.com' };
  beforeEach(async () => {
    const moduleCreateUser: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, ConfigModule],
      controllers: [CreateUserController],
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
      .send({ name: 'Isiaka Sanou' })
      .expect(201)
      .then((response) => {
        expect(response.body.email).toEqual(user.email);
        expect(response.body.name).toEqual('Isiaka Sanou');
      });
  });

  it('should return CREATED with basic names if user provide no info', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .expect(201)
      .then((response) => {
        expect(response.body.email).toEqual(user.email);
        expect(response.body.name).toEqual('John Doe');
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

  it('should return 400 if the user creation fail because of a wrong name', () => {
    isAuthenticated = true;
    mockCommandBus.execute.mockRejectedValueOnce(new InvalidName());
    return request(app.getHttpServer())
      .post('/users')
      .expect(400)
      .then((response) => {
        expect(response.body.message).toEqual(new InvalidName().message);
      });
  });

  it('should return 500 if another error occurred during the users creation', () => {
    isAuthenticated = true;
    mockCommandBus.execute.mockRejectedValueOnce('unknown exception');
    return request(app.getHttpServer()).post('/users').expect(500);
  });
});
