import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../../src/config/prisma.service';
import { createMock } from '@golevelup/ts-jest';
import { CommandBus } from '@nestjs/cqrs';
import { ReceiveFixtureModule } from '../../../../../src/config/modules/receiveFixture.module';
import { ReceiveFixtureCommandHandler } from '../../../../../src/app/commands/usecases/receiveFixture/receiveFixture.command.handler';
import { ReceiveFixtureCommand } from '../../../../../src/app/commands/usecases/receiveFixture/receiveFixtureCommand';
import { CreateFixtureCommand } from '../../../../../src/app/commands/usecases/createFixture/createFixtureCommand';
import { UpdateFixtureCommand } from '../../../../../src/app/commands/usecases/updateFixture/updateFixtureCommand';
import { createFixture, createLeague, createTeams, defaultTeams } from '../../../utils';

const feature = loadFeature('./test/acceptance/features/commands/receiveFixture/receiveFixture.feature');

defineFeature(feature, (test) => {
  let receiveFixtureCommandHandler: ReceiveFixtureCommandHandler;
  let prisma: PrismaService;

  let receiveFixtureCommand: ReceiveFixtureCommand;
  let fixtureId: string;
  const mockCommandBus = createMock<CommandBus>({
    execute(command): Promise<any> {
      return Promise.resolve(command);
    },
  });

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ReceiveFixtureModule],
    })
      .overrideProvider(CommandBus)
      .useValue(mockCommandBus)
      .compile();

    receiveFixtureCommandHandler = await app.resolve(ReceiveFixtureCommandHandler);
    prisma = await app.resolve(PrismaService);
  });

  beforeEach(async () => {
    const deleteFixture = prisma.fixture.deleteMany();
    const deleteEvent = prisma.event.deleteMany();
    const deleteTeams = prisma.team.deleteMany();
    const deleteLeagues = prisma.league.deleteMany();

    await prisma.$transaction([deleteFixture, deleteEvent, deleteTeams, deleteLeagues]);

    await createLeague(prisma);
    await createTeams(prisma, defaultTeams);
  });

  test('Receiving a new fixture', ({ given, when, then }) => {
    given(/the fixture (\d+) does not exist/, async (api_foot_id: string) => {
      return prisma.fixture.deleteMany({ where: { api_foot_id: parseInt(api_foot_id) } });
    });

    when(/I receive the fixture (\d*)/, async (apiFootFixtureId: string) => {
      receiveFixtureCommand = new ReceiveFixtureCommand(
        parseInt(apiFootFixtureId),
        defaultTeams[0].api_id,
        defaultTeams[1].api_id,
        new Date(),
        0,
        0,
        'OPEN',
        1,
      );
      return receiveFixtureCommandHandler.execute(receiveFixtureCommand);
    });

    then(/the fixture creation is called/, async () => {
      const createFixtureCommand = CreateFixtureCommand.fromFixture(receiveFixtureCommand);
      expect(mockCommandBus.execute).toHaveBeenCalledWith(createFixtureCommand);
    });
  });

  test('Receiving a known fixture', ({ given, when, then }) => {
    given(/the fixture (\d+) already exist/, async (api_foot_id: string) => {
      return createFixture(prisma, parseInt(api_foot_id));
    });

    when(/I receive the fixture (\d*)/, async (apiFootFixtureId: string) => {
      receiveFixtureCommand = new ReceiveFixtureCommand(parseInt(apiFootFixtureId), 1, 2, new Date(), 0, 0, 'OPEN', 1);
      return receiveFixtureCommandHandler.execute(receiveFixtureCommand).then((fixture) => (fixtureId = fixture.id));
    });

    then(/the fixture update is called/, async () => {
      const updateFixtureCommand = new UpdateFixtureCommand(
        fixtureId,
        receiveFixtureCommand.date,
        receiveFixtureCommand.home_team_goal,
        receiveFixtureCommand.away_team_goal,
        receiveFixtureCommand.status,
      );
      expect(mockCommandBus.execute).toHaveBeenCalledWith(updateFixtureCommand);
    });
  });
});
