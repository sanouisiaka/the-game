import { UpdateFixtureCommand } from './updateFixtureCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IFixtureRepository } from '../../../ports/fixture.repository.interface';
import { FixtureStatus } from '../../../domain/fixture/fixture.status';
import { Fixture } from '../../../domain/fixture/fixture';
import { FixtureNotFound } from '../../../domain/fixture/error/fixtureNotFound.error';

@CommandHandler(UpdateFixtureCommand)
export class UpdateFixtureCommandHandler implements ICommandHandler<UpdateFixtureCommand, Fixture> {
  constructor(@Inject(IFixtureRepository) private readonly fixtureRepository: IFixtureRepository) {}

  async execute(command: UpdateFixtureCommand): Promise<Fixture> {
    return this.fixtureRepository.getFixture(command.id).then((fixtureFromDb) => {
      if (fixtureFromDb) {
        fixtureFromDb.updateFixtureInfo(command.date, FixtureStatus[command.status], command.home_team_goal, command.away_team_goal);
        return this.fixtureRepository.updateFixtureInfo(fixtureFromDb);
      } else {
        throw new FixtureNotFound(command.id);
      }
    });
  }
}
