import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../../src/config/prisma.service';
import { createMock } from '@golevelup/ts-jest';
import { CommandBus } from '@nestjs/cqrs';
import { createTeams, defaultTeams } from '../../../utils';
import { ReceiveTeamCommandHandler } from '../../../../../src/app/commands/usecases/receiveTeam/receiveTeam.command.handler';
import { ReceiveTeamCommand } from '../../../../../src/app/commands/usecases/receiveTeam/receiveTeamCommand';
import { ReceiveTeamModule } from '../../../../../src/config/modules/receiveTeam.module';
import { CreateTeamCommand } from '../../../../../src/app/commands/usecases/createTeam/createTeamCommand';
import { cleanDb } from '../shared-steps';

const feature = loadFeature('./test/acceptance/features/commands/receiveTeam/receiveTeam.feature');

defineFeature(feature, (test) => {
  let receiveTeamCommandHandler: ReceiveTeamCommandHandler;
  let prisma: PrismaService;

  let receiveTeamCommand: ReceiveTeamCommand;

  const mockCommandBus = createMock<CommandBus>({
    execute(command): Promise<any> {
      return Promise.resolve(command);
    },
  });

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ReceiveTeamModule],
    })
      .overrideProvider(CommandBus)
      .useValue(mockCommandBus)
      .compile();

    receiveTeamCommandHandler = await app.resolve(ReceiveTeamCommandHandler);
    prisma = await app.resolve(PrismaService);
  });

  beforeEach(async () => {
    mockCommandBus.execute.mockClear();

    await cleanDb(prisma);
  });

  test('Receiving a new team', ({ given, when, then }) => {
    given(/the team (.+) does not exist/, async (teamName: string) => {
      const teamApiId = defaultTeams.find((t) => t.name === teamName).api_id;
      return prisma.team.deleteMany({ where: { api_foot_id: teamApiId } });
    });

    when(/I receive the new team (.+)/, async (teamName: string) => {
      receiveTeamCommand = new ReceiveTeamCommand(defaultTeams.find((t) => t.name === 'PSG').api_id, teamName, teamName, 'https://randomUrl.com');
      return receiveTeamCommandHandler.execute(receiveTeamCommand);
    });

    then(/the team creation is called/, async () => {
      const createTeamCommand = new CreateTeamCommand(
        receiveTeamCommand.api_foot_id,
        receiveTeamCommand.name,
        receiveTeamCommand.code,
        receiveTeamCommand.logoUrl,
      );
      expect(mockCommandBus.execute).toHaveBeenCalledWith(createTeamCommand);
    });
  });

  test('Receiving a known team', ({ given, when, then }) => {
    given(/the team (.+) already exist/, async (teamName: string) => {
      return createTeams(
        prisma,
        defaultTeams.filter((t) => (t.name = teamName)),
      );
    });

    when(/I receive the new team (.+)/, async (teamName: string) => {
      receiveTeamCommand = new ReceiveTeamCommand(defaultTeams.find((t) => t.name === 'PSG').api_id, teamName, teamName, 'https://randomUrl.com');
      return receiveTeamCommandHandler.execute(receiveTeamCommand);
    });

    then(/the team creation is not called/, async () => {
      expect(mockCommandBus.execute).not.toHaveBeenCalled();
    });
  });
});
