import { UpdateFixtureCommand } from './updateFixtureCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IFixtureRepository } from '../../../ports/fixture.repository.interface';
import { Fixture } from '../../../domain/event/fixture/fixture';
import { FixtureNotFound } from '../../../domain/event/fixture/error/fixtureNotFound.error';
import { EventStatus } from '../../../domain/event/event.status';

@CommandHandler(UpdateFixtureCommand)
export class UpdateFixtureCommandHandler implements ICommandHandler<UpdateFixtureCommand, Fixture> {
  constructor(@Inject(IFixtureRepository) private readonly fixtureRepository: IFixtureRepository) {}

  async execute(command: UpdateFixtureCommand): Promise<Fixture> {
    return this.fixtureRepository.getFixture(command.id).then((fixtureFromDb) => {
      if (fixtureFromDb) {
        fixtureFromDb.updateFixtureInfo(command.date, EventStatus[command.status], command.home_team_goal, command.away_team_goal);
        return this.fixtureRepository.updateFixtureInfo(fixtureFromDb);
      } else {
        throw new FixtureNotFound(command.id);
      }
    });
  }
}
