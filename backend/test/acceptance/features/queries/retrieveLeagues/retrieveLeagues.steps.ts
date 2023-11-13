import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../../src/config/prisma.service';
import { RetrieveLeaguesQueryHandler } from '../../../../../src/app/queries/usecases/retrieveLeagues/retrieveLeagues.query.handler';
import { RetrieveLeaguesModule } from '../../../../../src/config/modules/retrieveLeagues.module';
import { RetrieveLeaguesQuery } from '../../../../../src/app/queries/usecases/retrieveLeagues/retrieveLeaguesQuery';
import { League } from '../../../../../src/app/domain/league/league';
import { cleanDb } from '../../commands/shared-steps';

const feature = loadFeature('./test/acceptance/features/queries/retrieveLeagues/retrieveLeagues.feature');

defineFeature(feature, (test) => {
  let retrieveLeaguesQueryHandler: RetrieveLeaguesQueryHandler;
  let prisma: PrismaService;

  const leagues = [
    { api_foot_id: 61, name: 'Ligue 1', country: 'FR', logo: 'https://link.com' },
    { api_foot_id: 39, name: 'Premier League', country: 'EN', logo: 'https://link.com' },
    { api_foot_id: 78, name: 'Liga', country: 'ES', logo: 'https://link.com' },
  ];
  let result;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [RetrieveLeaguesModule],
    }).compile();

    retrieveLeaguesQueryHandler = await app.resolve(RetrieveLeaguesQueryHandler);
    prisma = await app.resolve(PrismaService);
    await cleanDb(prisma);
  });

  test('Retrieving all leagues', ({ given, when, then }) => {
    given(/there is a list of leagues in db/, async () => {
      await prisma.league.createMany({
        data: leagues,
      });
    });

    when(/I retrieve the list of leagues/, () => {
      return retrieveLeaguesQueryHandler.execute(new RetrieveLeaguesQuery()).then((leagues) => (result = leagues));
    });

    then(/the list of leagues is returned/, () => {
      expect(result).not.toBeUndefined();
      expect(result).toHaveLength(3);
      result.forEach((leagueResult: League, i: number) => {
        expect(leagueResult.name).toEqual(leagues[i].name);
        expect(leagueResult.country).toEqual(leagues[i].country);
        expect(leagueResult.logoUrl).toEqual(leagues[i].logo);
      });
    });
  });
});
