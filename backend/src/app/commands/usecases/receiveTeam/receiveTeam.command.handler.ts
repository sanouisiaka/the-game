import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReceiveTeamCommand } from './receiveTeamCommand';
import { Team } from '../../../domain/team/team';
import { ITeamRepository } from '../../../ports/team.repository.interface';
import { TeamAlreadyExists } from '../../../domain/team/error/teamAlreadyExists.error';
import { CreateTeamCommand } from '../createTeam/createTeamCommand';

@CommandHandler(ReceiveTeamCommand)
export class ReceiveTeamCommandHandler implements ICommandHandler<ReceiveTeamCommand, Team> {
  constructor(
    @Inject(ITeamRepository) private readonly teamRepository: ITeamRepository,
    private commandBus: CommandBus,
  ) {}

  async execute(command: ReceiveTeamCommand): Promise<Team> {
    return this.teamRepository.getTeamByApiFootId(command.api_foot_id).then((fixtureId) => {
      if (!fixtureId) {
        return this.commandBus.execute(new CreateTeamCommand(command.api_foot_id, command.name, command.code, command.logoUrl));
      } else {
        // not found team, we are not doing teams update for now
        throw new TeamAlreadyExists(command.api_foot_id);
      }
    });
  }
}