import { UpdateWinnerBetCommand } from './updateWinnerBetCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IFixtureRepository } from '../../../ports/fixture.repository.interface';
import { Fixture } from '../../../domain/event/fixture/fixture';
import { FixtureNotFound } from '../../../domain/event/fixture/error/fixtureNotFound.error';
import { WinningOption } from '../../../domain/event/bet/WinnerBet';

@CommandHandler(UpdateWinnerBetCommand)
export class UpdateWinnerBetCommandHandler implements ICommandHandler<UpdateWinnerBetCommand, Fixture> {
  constructor(@Inject(IFixtureRepository) private readonly fixtureRepository: IFixtureRepository) {}

  async execute(command: UpdateWinnerBetCommand): Promise<Fixture> {
    return this.fixtureRepository.getFixture(command.fixtureId).then((fixture) => {
      if (fixture) {
        fixture.updateWinnerBet(WinningOption.HOME, command.homeOdd);
        fixture.updateWinnerBet(WinningOption.DRAW, command.drawOdd);
        fixture.updateWinnerBet(WinningOption.AWAY, command.awayOdd);
        return this.fixtureRepository.updateFixtureBets(fixture);
      } else {
        throw new FixtureNotFound(command.fixtureId);
      }
    });
  }
}
