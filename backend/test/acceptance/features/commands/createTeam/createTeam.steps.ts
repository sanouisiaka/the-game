import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../../src/config/prisma.service';
import { Team } from '@prisma/client';
import { DomainError } from '../../../../../src/app/domain/domain.error';
import { createLeague, createTeams, defaultTeams } from '../../../utils';
import { CreateTeamCommand } from '../../../../../src/app/commands/usecases/createTeam/createTeamCommand';
import { CreateTeamCommandHandler } from '../../../../../src/app/commands/usecases/createTeam/createTeam.command.handler';
import { TeamAlreadyExists } from '../../../../../src/app/domain/team/error/teamAlreadyExists.error';
import { CreateTeamModule } from '../../../../../src/config/modules/createTeam.module';

const feature = loadFeature('./test/acceptance/features/commands/createTeam/createTeam.feature');

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

  let createTeamHandler: CreateTeamCommandHandler;
  let prisma: PrismaService;

  let newTeamId: number;
  let handlerError: DomainError;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CreateTeamModule],
    }).compile();

    createTeamHandler = await app.resolve(CreateTeamCommandHandler);
    prisma = await app.resolve(PrismaService);
  });

  beforeEach(async () => {
    const deleteFixture = prisma.fixture.deleteMany();
    const deleteEvent = prisma.event.deleteMany();
    const deleteTeams = prisma.team.deleteMany();
    const deleteLeagues = prisma.league.deleteMany();

    await prisma.$transaction([deleteFixture, deleteEvent, deleteTeams, deleteLeagues]);

    await createLeague(prisma);
  });

  const givenTheTeamDoesntExists = (given) => {
    given(/the team (.+) does not exist/, async (teamName: string) => {
      const teamApiId = defaultTeams.find((t) => t.name === teamName).api_id;
      return prisma.team.deleteMany({ where: { api_foot_id: teamApiId } });
    });
  };

  const whenICreateTheTeam = (when) => {
    when(/I want to create the team (.+)/, async (teamName: string) => {
      const team = teams.find((t) => t.name === teamName);
      const command = new CreateTeamCommand(team.api_id, team.name, team.name, 'https://arandomurl.com');
      return createTeamHandler
        .execute(command)
        .then((id) => (newTeamId = id))
        .catch((e) => {
          handlerError = e;
          return Promise.resolve();
        });
    });
  };

  test('Creating a team successfully', ({ given, when, then }) => {
    givenTheTeamDoesntExists(given);

    whenICreateTheTeam(when);

    then(/the team is created/, async () => {
      expect(handlerError).toBeUndefined();

      const team: Team = await prisma.team.findUnique({ where: { id: newTeamId } });
      expect(team).toBeDefined();
    });
  });

  test('Creating a already existing team', ({ given, when, then }) => {
    given(/the team (.+) already exist/, async (teamName: string) => {
      return createTeams(
        prisma,
        defaultTeams.filter((t) => (t.name = teamName)),
      );
    });

    whenICreateTheTeam(when);

    then(/the team creation fails because there already is a team with the same id/, async () => {
      expect(handlerError).not.toBeUndefined();
      expect(handlerError).not.toBeNull();
      expect(handlerError).toBeInstanceOf(TeamAlreadyExists);
    });
  });
});
