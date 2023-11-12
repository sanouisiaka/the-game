import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../../src/config/prisma.service';
import { Fixture } from '@prisma/client';
import { DomainError } from '../../../../../src/app/domain/domain.error';
import { createFixture, createLeague, createTeams, defaultTeams } from '../../../utils';
import { UpdateFixtureCommandHandler } from '../../../../../src/app/commands/usecases/updateFixture/updateFixture.command.handler';
import { UpdateFixtureModule } from '../../../../../src/config/modules/updateFixture.module';
import { UpdateFixtureCommand } from '../../../../../src/app/commands/usecases/updateFixture/updateFixtureCommand';
import { FixtureNotFound } from '../../../../../src/app/domain/event/fixture/error/fixtureNotFound.error';
import { InvalidGoalNumber } from '../../../../../src/app/domain/event/fixture/error/invalidGoalNumber.error';
import { cleanDb } from '../shared-steps';

const feature = loadFeature('./test/acceptance/features/commands/updateFixture/updateFixture.feature');

defineFeature(feature, (test) => {
  let updateFixtureHandler: UpdateFixtureCommandHandler;
  let prisma: PrismaService;

  let handlerError: DomainError;

  let createdFixtureId: string;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UpdateFixtureModule],
    }).compile();

    updateFixtureHandler = await app.resolve(UpdateFixtureCommandHandler);
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
      return createFixture(prisma, parseInt(api_foot_id)).then((result) => (createdFixtureId = result.eventId));
    });
  };

  const whenIUpdateThisFixture = (when) => {
    when(/I want to update this fixture with score (-?\d)-(-?\d)/, async (homeGoal: string, awayGoal: string) => {
      const updateCommand = new UpdateFixtureCommand(
        createdFixtureId ? createdFixtureId : 'unknown',
        new Date(),
        parseInt(homeGoal),
        parseInt(awayGoal),
        'CLOSE',
      );
      return updateFixtureHandler.execute(updateCommand).catch((e) => {
        handlerError = e;
        return Promise.resolve();
      });
    });
  };

  test('Updating a fixture successfully', ({ given, when, then }) => {
    givenTheFixtureExists(given);

    whenIUpdateThisFixture(when);

    then(/the fixture is updated with the score (-?\d)-(-?\d)/, async (homeGoal: string, awayGoal: string) => {
      expect(handlerError).toBeUndefined();

      const fixture: Fixture = await prisma.fixture.findUnique({ where: { eventId: createdFixtureId } });
      expect(fixture).toBeDefined();
      expect(fixture.home_team_goal).toEqual(parseInt(homeGoal));
      expect(fixture.away_team_goal).toEqual(parseInt(awayGoal));
    });
  });

  test('Updating a unknown fixture', ({ given, when, then }) => {
    givenTheFixtureDoesntExists(given);

    whenIUpdateThisFixture(when);

    then(/the fixture update fails because the fixture does not exist/, async () => {
      expect(handlerError).not.toBeUndefined();
      expect(handlerError).not.toBeNull();
      expect(handlerError).toBeInstanceOf(FixtureNotFound);
    });
  });

  test('Updating a fixture with a incorrect score', ({ given, when, then }) => {
    givenTheFixtureExists(given);

    whenIUpdateThisFixture(when);

    then(/the fixture is not created because the score is incorrect/, async () => {
      expect(handlerError).not.toBeUndefined();
      expect(handlerError).not.toBeNull();
      expect(handlerError).toBeInstanceOf(InvalidGoalNumber);
    });
  });
});
