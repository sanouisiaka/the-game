import { CreateTeamCommand } from './createTeamCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ITeamRepository } from '../../../ports/team.repository.interface';
import { Team } from '../../../domain/team/team';
import { TeamAlreadyExists } from '../../../domain/team/error/teamAlreadyExists.error';

@CommandHandler(CreateTeamCommand)
export class CreateTeamCommandHandler implements ICommandHandler<CreateTeamCommand, Team> {
  constructor(@Inject(ITeamRepository) private readonly teamRepository: ITeamRepository) {}

  async execute(command: CreateTeamCommand): Promise<Team> {
    return this.teamRepository.getTeamByApiFootId(command.api_foot_id).then((team) => {
      if (team) {
        throw new TeamAlreadyExists(team.api_foot_id);
      } else {
        return this.teamRepository.createTeam(Team.newTeam(command.api_foot_id, command.name, command.code, command.logoUrl));
      }
    });
  }
}
