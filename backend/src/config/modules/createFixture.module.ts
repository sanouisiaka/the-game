import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { IFixtureRepository } from '../../app/ports/fixture.repository.interface';
import { FixtureRepository } from '../../repository/fixture.repository';
import { PrismaService } from '../prisma.service';
import { ITeamRepository } from '../../app/ports/team.repository.interface';
import { TeamRepository } from '../../repository/team.repository';
import { ILeagueRepository } from '../../app/ports/league.repository.interface';
import { LeagueRepository } from '../../repository/league.repository';
import { CreateFixtureCommandHandler } from '../../app/commands/usecases/createFixture/createFixture.command.handler';

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
export class CreateFixtureModule {}
