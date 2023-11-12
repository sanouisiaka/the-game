import { EventPattern } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';
import { BetRequest } from './bet.request';
import { CommandBus } from '@nestjs/cqrs';
import { ReceiveBetCommand } from '../../../app/commands/usecases/receiveBet/receiveBetCommand';
import { DomainError } from '../../../app/domain/domain.error';

@Controller()
export class ReceiveBetsController {
  constructor(private commandBus: CommandBus) {}

  private readonly logger = new Logger(ReceiveBetsController.name);

  @EventPattern('BETS')
  async handleTeamEvent(bet: BetRequest) {
    this.logger.log('new bets receive: ' + JSON.stringify(bet));

    return this.commandBus.execute(new ReceiveBetCommand(bet.type, bet.api_foot_fixture_id, bet.options)).catch((e) => {
      if (e instanceof DomainError) {
        this.logger.error('error during bet command processing  ' + e.constructor.name + ': ' + e.message);
      } else {
        this.logger.error('error during bet command processing  ' + JSON.stringify(e));
      }
    });
  }
}
