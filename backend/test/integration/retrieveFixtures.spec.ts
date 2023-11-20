import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../src/api/auth.guard';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { QueryBus } from '@nestjs/cqrs';
import { createMock } from '@golevelup/ts-jest';
import { RetrieveFixturesModule } from '../../src/config/modules/retrieveFixtures.module';
import { Fixture } from '../../src/app/domain/event/fixture/fixture';
import { FixtureTeam } from '../../src/app/domain/event/fixture/fixtureTeam';
import { EventStatus } from '../../src/app/domain/event/event.status';
import { EventLeague } from '../../src/app/domain/event/eventLeague';
import { Page } from '../../src/app/common/page';
import { FixtureDto } from '../../src/api/usecases/retrieveFixtures/fixture.dto';
import { mockAuthUser } from './mock/mock.auth';

describe('retrieveFixtures controller tests', () => {
  let app: INestApplication;

  const mockQueryBus = createMock<QueryBus>();

  let isAuthenticated = true;

  const pageFixtures: Page<Fixture> = new Page(
    [
      Fixture.build('1', 1, new Date(), new FixtureTeam(41, 0), new FixtureTeam(42, 0), EventStatus.OPEN, new EventLeague(61), []),
      Fixture.build('2', 2, new Date(), new FixtureTeam(41, 0), new FixtureTeam(42, 0), EventStatus.OPEN, new EventLeague(61), []),
      Fixture.build('3', 3, new Date(), new FixtureTeam(41, 0), new FixtureTeam(42, 0), EventStatus.OPEN, new EventLeague(61), []),
    ],
    1,
    9,
  );

  beforeEach(async () => {
    const moduleRetrieveLeagues: TestingModule = await Test.createTestingModule({
      imports: [RetrieveFixturesModule],
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
        expect(response.body.response).toHaveLength(3);
        expect(response.body.currentPage).toEqual(1);
        expect(response.body.totalCount).toEqual(9);
        response.body.response.forEach((fixtureResponse: FixtureDto, i: number) => {
          expect(fixtureResponse.id).toEqual(pageFixtures.data[i].id);
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
