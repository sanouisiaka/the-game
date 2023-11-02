import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { IFixtureRepository } from '../../app/ports/fixture.repository.interface';
import { FixtureRepository } from '../../repository/command/fixture.repository';
import { PrismaService } from '../prisma.service';
import { CreateFixtureCommandHandler } from '../../app/commands/usecases/createFixture/createFixture.command.handler';
import { ITeamRepository } from '../../app/ports/team.repository.interface';
import { TeamRepository } from '../../repository/command/team.repository';
import { ILeagueRepository } from '../../app/ports/league.repository.interface';
import { LeagueRepository } from '../../repository/command/league.repository';

@Module({
  imports: [CqrsModule, ConfigModule],
  providers: [
    CreateFixtureCommandHandler,
    { provide: IFixtureRepository, useClass: FixtureRepository },
    {
      provide: ITeamRepository,
      useClass: TeamRepository,
    },
    {
      provide: ILeagueRepository,
      useClass: LeagueRepository,
    },
    PrismaService,
  ],
})
export class createFixtureModule {}
