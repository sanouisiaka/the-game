import { EventPattern, Payload } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';
import { BetRequest } from './bet.request';
import { CommandBus } from '@nestjs/cqrs';
import { ReceiveBetCommand } from '../../../app/commands/usecases/receiveBet/receiveBetCommand';

@Controller()
export class ReceiveBetsController {
  constructor(private commandBus: CommandBus) {}

  private readonly logger = new Logger(ReceiveBetsController.name);

  @EventPattern('BETS')
  async handleTeamEvent(@Payload() bet: BetRequest) {
    this.logger.log('new bets receive: ' + JSON.stringify(bet));

    return this.commandBus.execute(new ReceiveBetCommand(bet.type, bet.api_foot_fixture_id, bet.options));
  }
}
