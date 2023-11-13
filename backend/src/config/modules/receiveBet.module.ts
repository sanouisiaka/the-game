import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { IFixtureRepository } from '../../app/ports/fixture.repository.interface';
import { FixtureRepository } from '../../repository/fixture.repository';
import { PrismaService } from '../prisma.service';
import { ReceiveBetsController } from '../../api/usecases/receiveBets/receiveBets.controller';
import { ReceiveBetCommandHandler } from '../../app/commands/usecases/receiveBet/receiveBet.command.handler';

@Module({
  imports: [CqrsModule, ConfigModule],
  controllers: [ReceiveBetsController],
  providers: [ReceiveBetCommandHandler, { provide: IFixtureRepository, useClass: FixtureRepository }, PrismaService],
})
export class ReceiveBetModule {}
