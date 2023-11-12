import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IFixtureRepository } from '../../../ports/fixture.repository.interface';
import { Fixture } from '../../../domain/event/fixture/fixture';
import { ReceiveFixtureCommand } from './receiveFixtureCommand';
import { UpdateFixtureCommand } from '../updateFixture/updateFixtureCommand';
import { CreateFixtureCommand } from '../createFixture/createFixtureCommand';

@CommandHandler(ReceiveFixtureCommand)
export class ReceiveFixtureCommandHandler implements ICommandHandler<ReceiveFixtureCommand, Fixture> {
  constructor(
    @Inject(IFixtureRepository) private readonly fixtureRepository: IFixtureRepository,
    private commandBus: CommandBus,
  ) {}

  async execute(command: ReceiveFixtureCommand): Promise<Fixture> {
    return this.fixtureRepository.getIdByApiFootId(command.api_foot_id).then((fixtureId) => {
      if (fixtureId) {
        const updateFixtureCommand = new UpdateFixtureCommand(
          fixtureId,
          command.date,
          command.home_team_goal,
          command.away_team_goal,
          command.status,
        );

        return this.commandBus.execute(updateFixtureCommand);
      } else {
        return this.commandBus.execute(CreateFixtureCommand.fromFixture(command));
      }
    });
  }
}
