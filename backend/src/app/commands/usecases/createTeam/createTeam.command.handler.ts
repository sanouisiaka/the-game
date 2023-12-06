import { CreateTeamCommand } from './createTeamCommand';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { ITeamRepository } from '../../../ports/team.repository.interface';
import { Team } from '../../../domain/team/team';
import { TeamAlreadyExists } from '../../../domain/team/error/teamAlreadyExists.error';

@CommandHandler(CreateTeamCommand)
export class CreateTeamCommandHandler implements ICommandHandler<CreateTeamCommand, number> {
  constructor(@Inject(ITeamRepository) private readonly teamRepository: ITeamRepository) {}

  private readonly logger = new Logger(CreateTeamCommandHandler.name);

  async execute(command: CreateTeamCommand): Promise<number> {
    this.logger.log('creating team with api_foot_d: ' + command.api_foot_id);

    return this.teamRepository.getTeamByApiFootId(command.api_foot_id).then((team) => {
      if (team) {
        throw new TeamAlreadyExists(team.api_foot_id);
      } else {
        return this.teamRepository.createTeam(Team.newTeam(command.api_foot_id, command.name, command.code, command.logoUrl)).then((id) => {
          this.logger.log('team with id ' + id + ' created');
          return id;
        });
      }
    });
  }
}
