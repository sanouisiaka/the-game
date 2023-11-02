import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../../src/config/prisma.service';
import { Fixture } from '@prisma/client';
import { DomainError } from '../../../../../src/app/domain/domain.error';
import { createFixture, createLeague, createTeams } from '../../../utils';
import { CreateFixtureCommand } from '../../../../../src/app/commands/usecases/createFixture/createFixtureCommand';
import { CreateFixtureCommandHandler } from '../../../../../src/app/commands/usecases/createFixture/createFixture.command.handler';
import { createFixtureModule } from '../../../../../src/config/modules/createFixture.module';
import { CannotPlayAgainstHimself } from '../../../../../src/app/domain/fixture/error/CannotPlayAgainstHimself.error';
import { TeamNotFound } from '../../../../../src/app/domain/team/error/teamNotFound.error';
import { FixtureAlreadyExists } from '../../../../../src/app/domain/fixture/error/fixtureAlreadyExists.error';

const feature = loadFeature('./test/acceptance/features/commands/createFixture/createFixture.feature');

defineFeature(feature, (test) => {
  const teams = [
    {
      name: 'PSG',
      api_id: 41,
    },
    {
      name: 'OM',
      api_id: 42,
    },
  ];

  let createFixtureHandler: CreateFixtureCommandHandler;
  let prisma: PrismaService;

  let result;
  let handlerError: DomainError;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [createFixtureModule],
    }).compile();

    createFixtureHandler = await app.resolve(CreateFixtureCommandHandler);
    prisma = await app.resolve(PrismaService);
  });

  beforeEach(async () => {
    const deleteFixture = prisma.fixture.deleteMany();
    const deleteEvent = prisma.event.deleteMany();
    const deleteTeams = prisma.team.deleteMany();
    const deleteLeagues = prisma.league.deleteMany();

    await prisma.$transaction([deleteFixture, deleteEvent, deleteTeams, deleteLeagues]);

    await createLeague(prisma);
    await createTeams(prisma, teams);
  });

  const givenTheFixtureDoesntExists = (given) => {
    given(/the fixture (\d*) does not exist/, async (api_foot_id: string) => {
      return prisma.fixture.deleteMany({ where: { api_foot_id: parseInt(api_foot_id) } });
    });
  };

  const whenICreateTheFixture = (when) => {
    when(
      /I want to create the fixture (\d*) opposing (.*) and (.*)/,
      async (apiFootFixtureId: string, homeTeamName: string, awayTeamName: string) => {
        const homeTeam = teams.find((t) => t.name === homeTeamName);
        const awayTeam = teams.find((t) => t.name === awayTeamName);
        const command = new CreateFixtureCommand(
          parseInt(apiFootFixtureId),
          homeTeam ? homeTeam.api_id : 999,
          awayTeam ? awayTeam.api_id : 998,
          new Date(),
          0,
          0,
          'OPEN',
          61,
        );
        return createFixtureHandler
          .execute(command)
          .then((r) => (result = r))
          .catch((e) => {
            handlerError = e;
            return Promise.resolve();
          });
      },
    );
  };

  test('Creating a fixture successfully', ({ given, when, then }) => {
    givenTheFixtureDoesntExists(given);

    whenICreateTheFixture(when);

    then(/the fixture is created/, async () => {
      expect(handlerError).toBeUndefined();

      const fixture: Fixture = await prisma.fixture.findUnique({ where: { api_foot_id: result.api_foot_id } });
      expect(fixture).toBeDefined();
    });
  });

  test('Creating a already existing fixture', ({ given, when, then }) => {
    given(/the fixture (\d+) already exist/, async (api_foot_id: string) => {
      return createFixture(prisma, parseInt(api_foot_id));
    });

    whenICreateTheFixture(when);

    then(/the fixture creation fails because there already is a fixture with the same id/, async () => {
      expect(handlerError).not.toBeUndefined();
      expect(handlerError).not.toBeNull();
      expect(handlerError).toBeInstanceOf(FixtureAlreadyExists);
    });
  });

  test('Creating a fixture with a unknown team fails', ({ given, when, then }) => {
    givenTheFixtureDoesntExists(given);

    whenICreateTheFixture(when);

    then(/the fixture is not created because a team is unknown/, async () => {
      expect(handlerError).not.toBeUndefined();
      expect(handlerError).not.toBeNull();
      expect(handlerError).toBeInstanceOf(TeamNotFound);
    });
  });

  test('Creating a fixture with twice the same team is not possible', ({ given, when, then }) => {
    givenTheFixtureDoesntExists(given);

    whenICreateTheFixture(when);

    then(/the fixture is not created because the team appear twice/, async () => {
      expect(handlerError).not.toBeUndefined();
      expect(handlerError).not.toBeNull();
      expect(handlerError).toBeInstanceOf(CannotPlayAgainstHimself);
    });
  });
});
