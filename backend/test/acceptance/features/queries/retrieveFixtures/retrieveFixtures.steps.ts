import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../../src/config/prisma.service';
import { cleanDb } from '../../commands/shared-steps';
import { RetrieveFixturesQueryHandler } from '../../../../../src/app/queries/usecases/retrieveFixtures/retrieveFixtures.query.handler';
import { createFixtures, createLeague, createTeams, defaultLigues, defaultTeams } from '../../../utils';
import { RetrieveFixturesQuery } from '../../../../../src/app/queries/usecases/retrieveFixtures/retrieveFixturesQuery';
import { RetrieveFixturesModule } from '../../../../../src/config/modules/retrieveFixtures.module';
import { Page } from '../../../../../src/app/queries/page';
import { FixtureDto } from '../../../../../src/app/queries/dto/fixture';

const feature = loadFeature('./test/acceptance/features/queries/retrieveFixtures/retrieveFixtures.feature');

defineFeature(feature, (test) => {
  let retrieveFixturesQueryHandler: RetrieveFixturesQueryHandler;
  let prisma: PrismaService;

  let result: Page<FixtureDto>;
  let paginationSize: number;
  let pageNumber: number;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [RetrieveFixturesModule],
    }).compile();

    retrieveFixturesQueryHandler = await app.resolve(RetrieveFixturesQueryHandler);
    prisma = await app.resolve(PrismaService);
    await cleanDb(prisma);
    await createLeague(prisma);
    await createTeams(prisma, defaultTeams);
    paginationSize = undefined;
  });

  const whenIRetrieveFixtureAfter = (when) => {
    when(/I retrieve the page (\d) of (.*)'s fixtures after (.*)/, (page: number, ligue: string, after: string) => {
      pageNumber = page - 1;
      const ligueId = defaultLigues.find((l) => l.name === ligue).id;
      return retrieveFixturesQueryHandler
        .execute(new RetrieveFixturesQuery(ligueId, undefined, new Date(after), pageNumber, paginationSize))
        .then((f) => (result = f));
    });
  };

  const whenIRetrieveFixtureBefore = (when) => {
    when(/I retrieve the page (\d) of fixtures before (.*)/, (page: number, ligue: string, before: string) => {
      pageNumber = page - 1;
      return retrieveFixturesQueryHandler
        .execute(new RetrieveFixturesQuery(undefined, new Date(before), undefined, pageNumber, paginationSize))
        .then((f) => (result = f));
    });
  };

  const thenThisListOfFixtureIsReturned = (then) => {
    then(/a sorted list of fixtures is returned/, (fixturesItem: FixtureItem[]) => {
      const expectedLeagueId = defaultLigues.find((l) => l.name === fixturesItem[0].league).id;
      expect(result).not.toBeUndefined();
      expect(result.meta.page).toEqual(pageNumber);
      expect(result.data.length).toBeLessThanOrEqual(paginationSize);

      result.data.forEach((fixtureResult: FixtureDto, i: number) => {
        expect(fixtureResult.homeTeam.name).toEqual(fixturesItem[i].homeTeam);
        expect(fixtureResult.awayTeam.name).toEqual(fixturesItem[i].awayTeam);

        expect(fixtureResult.date).toEqual(new Date(fixturesItem[i].date));
        expect(fixtureResult.leagueId).toEqual(expectedLeagueId);
      });
    });
  };

  test('Retrieving paginated list of next fixtures', ({ given, when, then }) => {
    given(/there is the following fixtures/, async (fixtures: FixtureItem[]) => {
      return createFixtures(fixtures, prisma);
    });

    when(/I want to retrieve fixtures by (\d)/, (size: string) => {
      paginationSize = parseInt(size);
    });

    whenIRetrieveFixtureAfter(when);

    thenThisListOfFixtureIsReturned(then);

    whenIRetrieveFixtureAfter(when);

    thenThisListOfFixtureIsReturned(then);

    then(/the total count of fixtures is (\d*)/, (total: string) => {
      expect(result.meta.total).toEqual(parseInt(total));
    });

    whenIRetrieveFixtureBefore(when);

    thenThisListOfFixtureIsReturned(then);
  });

  test('Retrieving paginated list of next fixture without sizing', ({ given, when, then }) => {
    given(/there is a lot of fixtures/, () => {
      return createFixtures(
        [...Array(15)].map((_, i) => {
          return {
            id: i.toString(),
            homeTeam: defaultTeams[0].name,
            awayTeam: defaultTeams[1].name,
            date: '2996-02-07',
            league: defaultLigues[0].name,
          };
        }),
        prisma,
      );
    });

    whenIRetrieveFixtureAfter(when);

    then(/a list of fixtures is returned by (\d*)/, (size: string) => {
      expect(result.data).toHaveLength(parseInt(size));
    });
  });
});

class FixtureItem {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  league: string;
}
