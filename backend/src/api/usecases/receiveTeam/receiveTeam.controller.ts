import { EventPattern } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';
import { TeamRequest } from './team.request';
import { CommandBus } from '@nestjs/cqrs';
import { ReceiveTeamCommand } from '../../../app/commands/usecases/receiveTeam/receiveTeamCommand';

@Controller()
export class ReceiveTeamController {
  constructor(private commandBus: CommandBus) {}

  private readonly logger = new Logger(ReceiveTeamController.name);

  @EventPattern('FIXTURE')
  async handleTeamEvent(data: TeamRequest) {
    this.logger.log('new team event receive: ' + JSON.stringify(data));

    const command = new ReceiveTeamCommand(data.api_foot_id, data.name, data.code, data.logUrl);

    return this.commandBus.execute(command);
  }
}
