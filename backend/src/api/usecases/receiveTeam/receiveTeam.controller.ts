import { EventPattern } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';
import { TeamRequest } from './team.request';
import { CommandBus } from '@nestjs/cqrs';
import { ReceiveTeamCommand } from '../../../app/commands/usecases/receiveTeam/receiveTeamCommand';
import { DomainError } from '../../../app/domain/domain.error';

@Controller()
export class ReceiveTeamController {
  constructor(private commandBus: CommandBus) {}

  private readonly logger = new Logger(ReceiveTeamController.name);

  @EventPattern('TEAM')
  async handleTeamEvent(data: TeamRequest) {
    this.logger.log('new team event receive: ' + JSON.stringify(data));

    const command = new ReceiveTeamCommand(data.api_foot_id, data.name, data.code, data.logo);

    this.logger.log('sending: ' + JSON.stringify(command));
    await this.commandBus.execute(command).catch((e) => {
      if (e instanceof DomainError) {
        this.logger.error('error during team command processing  ' + e.constructor.name + ': ' + e.message);
      } else {
        this.logger.error('error during team command processing  ' + JSON.stringify(e));
      }
    });
  }
}
