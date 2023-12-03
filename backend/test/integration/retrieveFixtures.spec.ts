import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../src/api/auth.guard';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { createMock } from '@golevelup/ts-jest';
import { Page } from '../../src/app/queries/page';
import { mockAuthUser } from './mock/mock.auth';
import { FixtureDto } from '../../src/app/queries/dto/fixture';
import { ConfigModule } from '@nestjs/config';
import { RetrieveFixturesController } from '../../src/api/usecases/retrieveFixtures/retrieveFixtures.controller';

describe('retrieveFixtures controller tests', () => {
  let app: INestApplication;

  const mockQueryBus = createMock<QueryBus>();

  let isAuthenticated = true;

  const pageFixtures: Page<FixtureDto> = new Page(
    [
      {
        id: '1',
        date: new Date(),
        leagueId: 1,
        status: 'OPEN',
        awayTeam: { id: 12, code: 'PSG', name: 'PSG', logoUrl: 'url', goal: 5 },
        homeTeam: { id: 0, code: 'OM', name: 'OM', logoUrl: 'url', goal: 0 },
        winnerBets: [],
      },
      {
        id: '69',
        date: new Date(),
        leagueId: 2,
        status: 'OPEN',
        awayTeam: { id: 12, code: 'PSG', name: 'PSG', logoUrl: 'url', goal: 12 },
        homeTeam: { id: 0, code: 'OM', name: 'OM', logoUrl: 'url', goal: 0 },
        winnerBets: [],
      },
    ],
    1,
    9,
  );

  beforeEach(async () => {
    const moduleRetrieveLeagues: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, ConfigModule],
      controllers: [RetrieveFixturesController],
    })
      .overrideProvider(QueryBus)
      .useValue(mockQueryBus)
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: () => {
          return mockAuthUser(isAuthenticated);
        },
      })
      .compile();

    app = moduleRetrieveLeagues.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    mockQueryBus.execute.mockReset();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return paginated list of fixtures', async () => {
    mockQueryBus.execute.mockReturnValueOnce(Promise.resolve(pageFixtures));

    return request(app.getHttpServer())
      .get('/fixtures')
      .query({ leagueId: 1, from: '2022-07-04', page: 1 })
      .expect(200)
      .then((response) => {
        expect(response.body.response).toHaveLength(2);
        expect(response.body.currentPage).toEqual(1);
        expect(response.body.totalCount).toEqual(9);
        response.body.response.forEach((fixtureResponse, i: number) => {
          expect(fixtureResponse.id).toEqual(pageFixtures.data[i].id);
          expect(fixtureResponse.leagueId).toEqual(pageFixtures.data[i].leagueId);
          expect(fixtureResponse.date).toEqual(pageFixtures.data[i].date.toISOString());
        });
      });
  });

  it('should return bad request if leagueId is missing', async () => {
    mockQueryBus.execute.mockReturnValueOnce(Promise.resolve(pageFixtures));

    return request(app.getHttpServer())
      .get('/fixtures')
      .query({ from: '2022-07-04', page: 1, size: 10 })
      .expect(400)
      .then((response) => {
        expect(response.body.message[0]).toEqual('leagueId should not be empty');
      });
  });

  it('should return bad request if from date is missing', async () => {
    mockQueryBus.execute.mockReturnValueOnce(Promise.resolve(pageFixtures));

    return request(app.getHttpServer())
      .get('/fixtures')
      .query({ leagueId: 1, page: 1, size: 10 })
      .expect(400)
      .then((response) => {
        expect(response.body.message[0]).toEqual('from should not be empty');
      });
  });

  it('should return bad request if page is missing', async () => {
    mockQueryBus.execute.mockReturnValueOnce(Promise.resolve(pageFixtures));

    return request(app.getHttpServer())
      .get('/fixtures')
      .query({ leagueId: 1, from: '2022-07-04', size: 10 })
      .expect(400)
      .then((response) => {
        expect(response.body.message[0]).toEqual('page should not be empty');
      });
  });

  it('should return 401 if the user is not logged', () => {
    isAuthenticated = false;
    return request(app.getHttpServer()).get('/fixtures').expect(401);
  });

  it('should return 500 if another error occurred during the user retrieving', () => {
    isAuthenticated = true;
    mockQueryBus.execute.mockRejectedValueOnce('unknown exception');
    return request(app.getHttpServer()).get('/fixtures').query({ leagueId: 1, from: '2022-07-04', page: 1, size: 10 }).expect(500);
  });
});
