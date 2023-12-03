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

  const whenIRetrievePage = (when) => {
    when(/I retrieve the page (\d) of (.*)'s fixtures after (.*)/, (page: number, ligue: string, date: string) => {
      pageNumber = page - 1;
      const ligueId = defaultLigues.find((l) => l.name === ligue).id;
      return retrieveFixturesQueryHandler
        .execute(new RetrieveFixturesQuery(ligueId, new Date(date), pageNumber, paginationSize))
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
        prisma.team.findFirst({ where: { name: fixturesItem[i].homeTeam } }).then((t) => {
          expect(fixtureResult.homeTeam.id === t.id);
          expect(fixtureResult.homeTeam.name === t.name);
          expect(fixtureResult.homeTeam.logoUrl === t.logoUrl);
          expect(fixtureResult.homeTeam.goal === 0);
        });
        prisma.team.findFirst({ where: { name: fixturesItem[i].awayTeam } }).then((t) => {
          expect(fixtureResult.awayTeam.id === t.id);
          expect(fixtureResult.awayTeam.name === t.name);
          expect(fixtureResult.awayTeam.logoUrl === t.logoUrl);
          expect(fixtureResult.awayTeam.goal === 0);
        });

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

    whenIRetrievePage(when);

    thenThisListOfFixtureIsReturned(then);

    whenIRetrievePage(when);

    thenThisListOfFixtureIsReturned(then);

    then(/the total count of fixtures is (\d*)/, (total: string) => {
      expect(result.meta.total).toEqual(parseInt(total));
    });
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

    whenIRetrievePage(when);

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
