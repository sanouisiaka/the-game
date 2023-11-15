import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../../src/config/prisma.service';
import { DomainError } from '../../../../../src/app/domain/domain.error';
import { createLeague, createRandomFixture, createTeams, defaultTeams } from '../../../utils';
import { FixtureNotFound } from '../../../../../src/app/domain/event/fixture/error/fixtureNotFound.error';
import { UpdateWinnerBetCommandHandler } from '../../../../../src/app/commands/usecases/updateWinnerBet/updateBet.command.handler';
import { UpdateWinnerBetModule } from '../../../../../src/config/modules/updateWinnerBet.module';
import { cleanDb } from '../shared-steps';
import { UpdateWinnerBetCommand } from '../../../../../src/app/commands/usecases/updateWinnerBet/updateWinnerBetCommand';
import { IncorrectOdd } from '../../../../../src/app/domain/event/bet/error/incorrectOdd.error';

const feature = loadFeature('./test/acceptance/features/commands/updateWinnerBet/updateWinnerBet.feature');

defineFeature(feature, (test) => {
  let updateWinnerBetHandler: UpdateWinnerBetCommandHandler;
  let prisma: PrismaService;

  let handlerError: DomainError;

  let createdFixtureId: string;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UpdateWinnerBetModule],
    }).compile();

    updateWinnerBetHandler = await app.resolve(UpdateWinnerBetCommandHandler);
    prisma = await app.resolve(PrismaService);
  });

  beforeEach(async () => {
    await cleanDb(prisma);

    await createLeague(prisma);
    await createTeams(prisma, defaultTeams);
  });

  const givenTheFixtureDoesntExists = (given) => {
    given(/the fixture (\d*) does not exist/, async (api_foot_id: string) => {
      return prisma.fixture.deleteMany({ where: { api_foot_id: parseInt(api_foot_id) } });
    });
  };

  const givenTheFixtureExists = (given) => {
    given(/the fixture (\d+) already exist/, async (api_foot_id: string) => {
      return createRandomFixture(prisma, api_foot_id).then((result) => (createdFixtureId = result[0].eventId));
    });
  };

  const whenIUpdateThisFixture = (when) => {
    when(
      /I update this fixture with odds (-?\d*\.?\d*) - (-?\d*\.?\d*) - (-?\d*\.?\d*)/,
      async (homeOdd: string, drawOdd: string, awayOdd: string) => {
        const updateCommand = new UpdateWinnerBetCommand(
          createdFixtureId ? createdFixtureId : 'unknown',
          parseFloat(homeOdd),
          parseFloat(drawOdd),
          parseFloat(awayOdd),
        );
        return updateWinnerBetHandler.execute(updateCommand).catch((e) => {
          handlerError = e;
          return Promise.resolve();
        });
      },
    );
  };

  const thenFixturesOddsAreUpdated = (then) => {
    then(
      /the fixture is update with his new winner odds (\d*\.?\d*) - (\d*\.?\d*) - (\d*\.?\d*)/,
      async (homeOdd: string, drawOdd: string, awayOdd: string) => {
        expect(handlerError).toBeUndefined();

        const homeBet = await prisma.bet.findFirst({ where: { eventId: createdFixtureId, Winner_bet: { winner: 'HOME' } } });
        expect(homeBet).toBeDefined();
        expect(homeBet.odd).toEqual(parseFloat(homeOdd));

        const drawBet = await prisma.bet.findFirst({ where: { eventId: createdFixtureId, Winner_bet: { winner: 'DRAW' } } });
        expect(drawBet).toBeDefined();
        expect(drawBet.odd).toEqual(parseFloat(drawOdd));

        const awayBet = await prisma.bet.findFirst({ where: { eventId: createdFixtureId, Winner_bet: { winner: 'AWAY' } } });
        expect(awayBet).toBeDefined();
        expect(awayBet.odd).toEqual(parseFloat(awayOdd));
      },
    );
  };

  test("Updating a fixture's winner bet", ({ given, when, then }) => {
    givenTheFixtureExists(given);

    whenIUpdateThisFixture(when);

    thenFixturesOddsAreUpdated(then);

    whenIUpdateThisFixture(when);

    thenFixturesOddsAreUpdated(then);
  });

  test("Updating a unknown fixture's winner bet", ({ given, when, then }) => {
    givenTheFixtureDoesntExists(given);

    whenIUpdateThisFixture(when);

    then(/the fixture update fails because the fixture does not exist/, async () => {
      expect(handlerError).not.toBeUndefined();
      expect(handlerError).not.toBeNull();
      expect(handlerError).toBeInstanceOf(FixtureNotFound);
    });
  });

  test("Updating a fixture's winner bet with incorrect odds", ({ given, when, then }) => {
    givenTheFixtureExists(given);

    whenIUpdateThisFixture(when);

    then(/the fixture update fails because the odds are incorrects/, async () => {
      expect(handlerError).not.toBeUndefined();
      expect(handlerError).not.toBeNull();
      expect(handlerError).toBeInstanceOf(IncorrectOdd);
    });
  });
});
