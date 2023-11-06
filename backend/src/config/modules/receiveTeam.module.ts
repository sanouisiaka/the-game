import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { ReceiveTeamController } from '../../api/usecases/receiveTeam/receiveTeam.controller';
import { ReceiveTeamCommandHandler } from '../../app/commands/usecases/receiveTeam/receiveTeam.command.handler';
import { ITeamRepository } from '../../app/ports/team.repository.interface';
import { TeamRepository } from '../../repository/command/team.repository';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [CqrsModule, ConfigModule],
  controllers: [ReceiveTeamController],
  providers: [ReceiveTeamCommandHandler, { provide: ITeamRepository, useClass: TeamRepository }, PrismaService],
})
export class ReceiveTeamModule {}
