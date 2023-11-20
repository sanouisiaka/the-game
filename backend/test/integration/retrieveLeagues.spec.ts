import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../src/api/auth.guard';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { QueryBus } from '@nestjs/cqrs';
import { createMock } from '@golevelup/ts-jest';
import { RetrieveLeaguesModule } from '../../src/config/modules/retrieveLeagues.module';
import { League } from '../../src/app/domain/league/league';
import { LeagueDto } from '../../src/api/usecases/retrieveLeagues/league.dto';
import { mockAuthUser } from './mock/mock.auth';

describe('retrieveLeagues controller tests', () => {
  let app: INestApplication;

  const mockQueryBus = createMock<QueryBus>();

  let isAuthenticated = true;

  const leagues = [
    League.build(1, 61, 'Ligue 1', 'FR', 'https://link.com'),
    League.build(2, 39, 'Premier League', 'EN', 'https://link.com'),
    League.build(3, 78, 'Liga', 'ES', 'https://link.com'),
  ];

  beforeEach(async () => {
    const moduleRetrieveLeagues: TestingModule = await Test.createTestingModule({
      imports: [RetrieveLeaguesModule],
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
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return list of leagues', async () => {
    mockQueryBus.execute.mockReturnValueOnce(Promise.resolve(leagues));

    return request(app.getHttpServer())
      .get('/leagues')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(3);
        response.body.forEach((leagueResponse: LeagueDto, i: number) => {
          expect(leagueResponse.name).toEqual(leagues[i].name);
          expect(leagueResponse.country).toEqual(leagues[i].country);
          expect(leagueResponse.logoUrl).toEqual(leagues[i].logoUrl);
        });
      });
  });

  it('should return 401 if the user is not logged', () => {
    isAuthenticated = false;
    return request(app.getHttpServer()).get('/leagues').expect(401);
  });

  it('should return 500 if another error occured during the user retrieving', () => {
    isAuthenticated = true;
    mockQueryBus.execute.mockRejectedValueOnce('unknown exception');
    return request(app.getHttpServer()).get('/leagues').expect(500);
  });
});
