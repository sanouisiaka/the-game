import { EventPattern } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';
import { FixtureRequest } from './fixture.request';
import { CommandBus } from '@nestjs/cqrs';
import { ReceiveFixtureCommand } from '../../../app/commands/usecases/receiveFixture/receiveFixtureCommand';
import { DomainError } from '../../../app/domain/domain.error';

@Controller()
export class ReceiveFixtureController {
  constructor(private commandBus: CommandBus) {}

  private readonly logger = new Logger(ReceiveFixtureController.name);

  @EventPattern('FIXTURE')
  async handleFixtureEvent(data: FixtureRequest) {
    this.logger.log('new fixture event receive: ' + JSON.stringify(data));

    const command = new ReceiveFixtureCommand(
      data.api_foot_id,
      data.home_team_id,
      data.away_team_id,
      data.date,
      data.home_team_goal,
      data.away_team_goal,
      data.status,
      data.api_foot_league_id,
    );

    await this.commandBus.execute(command).catch((e) => {
      if (e instanceof DomainError) {
        this.logger.error('error during fixture command processing  ' + e.constructor.name + ': ' + e.message);
      } else {
        this.logger.error('error during fixture command processing  ' + JSON.stringify(e));
      }
    });
  }
}
