import { UpdateWinnerBetCommand } from './updateWinnerBetCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { IFixtureRepository } from '../../../ports/fixture.repository.interface';
import { Fixture } from '../../../domain/event/fixture/fixture';
import { FixtureNotFound } from '../../../domain/event/fixture/error/fixtureNotFound.error';
import { WinningOption } from '../../../domain/event/bet/WinnerBet';

@CommandHandler(UpdateWinnerBetCommand)
export class UpdateWinnerBetCommandHandler implements ICommandHandler<UpdateWinnerBetCommand, Fixture> {
  constructor(@Inject(IFixtureRepository) private readonly fixtureRepository: IFixtureRepository) {}

  private readonly logger = new Logger(UpdateWinnerBetCommandHandler.name);

  async execute(command: UpdateWinnerBetCommand): Promise<Fixture> {
    this.logger.log('updating winner bet fixture : ' + command.fixtureId);
    return this.fixtureRepository.getFixture(command.fixtureId).then(async (fixture) => {
      if (fixture) {
        fixture.updateWinnerBet(WinningOption.HOME, command.homeOdd);
        fixture.updateWinnerBet(WinningOption.DRAW, command.drawOdd);
        fixture.updateWinnerBet(WinningOption.AWAY, command.awayOdd);
        return this.fixtureRepository.updateFixtureBets(fixture).then((f) => {
          this.logger.log('winner bet for fixture ' + command.fixtureId + 'updated with: ' + JSON.stringify(fixture.winnerBets));

          return f;
        });
      } else {
        throw new FixtureNotFound(command.fixtureId);
      }
    });
  }
}
