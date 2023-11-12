import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IFixtureRepository } from '../../../ports/fixture.repository.interface';
import { Fixture } from '../../../domain/event/fixture/fixture';
import { ReceiveBetCommand } from './receiveBetCommand';
import { UpdateWinnerBetCommand } from '../updateWinnerBet/updateWinnerBetCommand';
import { FixtureNotFound } from '../../../domain/event/fixture/error/fixtureNotFound.error';
import { BetType } from '../../../domain/event/bet/bet';
import { UnknownBetType } from '../../../domain/event/bet/error/unknownBetType.error';

@CommandHandler(ReceiveBetCommand)
export class ReceiveBetCommandHandler implements ICommandHandler<ReceiveBetCommand, Fixture> {
  constructor(
    @Inject(IFixtureRepository) private readonly fixtureRepository: IFixtureRepository,
    private commandBus: CommandBus,
  ) {}

  async execute(receivedBet: ReceiveBetCommand): Promise<Fixture> {
    return this.fixtureRepository.getIdByApiFootId(receivedBet.api_foot_fixture_id).then((fixtureId) => {
      if (fixtureId) {
        let betCommand;
        if (receivedBet.type === BetType.WINNER) {
          const homeOdd = receivedBet.options.find((option) => option.value === 'Home').odd;
          const drawOdd = receivedBet.options.find((option) => option.value === 'Draw').odd;
          const awayOdd = receivedBet.options.find((option) => option.value === 'Away').odd;
          betCommand = new UpdateWinnerBetCommand(fixtureId, homeOdd, drawOdd, awayOdd);
        } else {
          throw new UnknownBetType();
        }
        return this.commandBus.execute(betCommand);
      } else {
        throw new FixtureNotFound(receivedBet.api_foot_fixture_id.toString());
      }
    });
  }
}
