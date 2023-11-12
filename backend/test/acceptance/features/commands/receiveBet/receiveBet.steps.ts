import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../../src/config/prisma.service';
import { createMock } from '@golevelup/ts-jest';
import { CommandBus } from '@nestjs/cqrs';
import { createFixture, createLeague, createTeams, defaultTeams } from '../../../utils';
import { cleanDb } from '../shared-steps';
import { ReceiveBetCommandHandler } from '../../../../../src/app/commands/usecases/receiveBet/receiveBet.command.handler';
import { ReceiveBetCommand } from '../../../../../src/app/commands/usecases/receiveBet/receiveBetCommand';
import { ReceiveBetModule } from '../../../../../src/config/modules/receiveBet.module';
import { DomainError } from '../../../../../src/app/domain/domain.error';
import { FixtureNotFound } from '../../../../../src/app/domain/event/fixture/error/fixtureNotFound.error';
import { UnknownBetType } from '../../../../../src/app/domain/event/bet/error/unknownBetType.error';

const feature = loadFeature('./test/acceptance/features/commands/receiveBet/receiveBet.feature');

defineFeature(feature, (test) => {
  let receiveBetCommandHandler: ReceiveBetCommandHandler;
  let prisma: PrismaService;

  let home: number;
  let draw: number;
  let away: number;

  let handlerError: DomainError;

  const mockCommandBus = createMock<CommandBus>({
    execute(command): Promise<any> {
      return Promise.resolve(command);
    },
  });

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ReceiveBetModule],
    })
      .overrideProvider(CommandBus)
      .useValue(mockCommandBus)
      .compile();

    receiveBetCommandHandler = await app.resolve(ReceiveBetCommandHandler);
    prisma = await app.resolve(PrismaService);
  });

  beforeEach(async () => {
    await cleanDb(prisma);

    await createLeague(prisma);
    await createTeams(prisma, defaultTeams);
  });

  const whenIReceiveAWinnerBet = (when) => {
    when(
      /I receive the new winner bet (\d*\.?\d*) - (\d*\.?\d*) - (\d*\.?\d*) for fixture (\d+)/,
      async (homeOdd: string, drawOdd: string, awayOdd: string, apiFootFixtureId: string) => {
        home = parseFloat(homeOdd);
        draw = parseFloat(drawOdd);
        away = parseFloat(awayOdd);
        const receiveBetCommand = new ReceiveBetCommand('WINNER', parseInt(apiFootFixtureId), [
          { value: 'Home', odd: home },
          { value: 'Draw', odd: draw },
          { value: 'Away', odd: away },
        ]);
        return receiveBetCommandHandler.execute(receiveBetCommand).catch((e) => {
          handlerError = e;
          return Promise.resolve();
        });
      },
    );
  };

  test('Receiving a new winner bet', ({ given, when, then }) => {
    given(/the fixture (\d+) already exist/, async (api_foot_id: string) => {
      return createFixture(prisma, parseInt(api_foot_id));
    });

    whenIReceiveAWinnerBet(when);

    then(/the fixture's winner bet update is called with specified odds/, async () => {
      expect(mockCommandBus.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          homeOdd: home,
          drawOdd: draw,
          awayOdd: away,
        }),
      );
    });
  });

  test('Receiving a bet for a unknown fixture', ({ given, when, then }) => {
    given(/the fixture (\d*) does not exist/, async (api_foot_id: string) => {
      return prisma.fixture.deleteMany({ where: { api_foot_id: parseInt(api_foot_id) } });
    });

    whenIReceiveAWinnerBet(when);

    then(/he fixture's winner bet update is not called because the fixture does not exist/, async () => {
      expect(handlerError).not.toBeUndefined();
      expect(handlerError).not.toBeNull();
      expect(handlerError).toBeInstanceOf(FixtureNotFound);
    });
  });

  test('Receiving a unknown bet', ({ given, when, then }) => {
    given(/the fixture (\d+) already exist/, async (api_foot_id: string) => {
      return createFixture(prisma, parseInt(api_foot_id));
    });

    when(/I receive a unknown type bet for fixture (\d+)/, async (apiFootFixtureId: string) => {
      const receiveBetCommand = new ReceiveBetCommand(undefined, parseInt(apiFootFixtureId), [
        { value: 'Home', odd: 1.0 },
        { value: 'Draw', odd: 1.0 },
        { value: 'Away', odd: 1.0 },
      ]);
      return receiveBetCommandHandler.execute(receiveBetCommand).catch((e) => {
        handlerError = e;
        return Promise.resolve();
      });
    });
    then(/a error is return and the fixture bet update is not called/, async () => {
      expect(handlerError).not.toBeUndefined();
      expect(handlerError).not.toBeNull();
      expect(handlerError).toBeInstanceOf(UnknownBetType);
    });
  });
});
