import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { ITeamRepository } from '../../app/ports/team.repository.interface';
import { TeamRepository } from '../../repository/team.repository';
import { PrismaService } from '../prisma.service';
import { CreateTeamCommandHandler } from '../../app/commands/usecases/createTeam/createTeam.command.handler';

@Module({
  imports: [CqrsModule, ConfigModule],
  providers: [CreateTeamCommandHandler, { provide: ITeamRepository, useClass: TeamRepository }, PrismaService],
})
export class CreateTeamModule {}
