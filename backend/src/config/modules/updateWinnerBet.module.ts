import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { IFixtureRepository } from '../../app/ports/fixture.repository.interface';
import { FixtureRepository } from '../../repository/fixture.repository';
import { PrismaService } from '../prisma.service';
import { UpdateWinnerBetCommandHandler } from '../../app/commands/usecases/updateWinnerBet/updateBet.command.handler';

@Module({
  imports: [CqrsModule, ConfigModule],
  providers: [UpdateWinnerBetCommandHandler, { provide: IFixtureRepository, useClass: FixtureRepository }, PrismaService],
})
export class UpdateWinnerBetModule {}
