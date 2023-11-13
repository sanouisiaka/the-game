import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '../prisma.service';
import { ConfigModule } from '@nestjs/config';
import { RetrieveLeaguesController } from '../../api/usecases/retrieveLeagues/retrieveLeagues.controller';
import { RetrieveLeaguesQueryHandler } from '../../app/queries/usecases/retrieveLeagues/retrieveLeagues.query.handler';
import { ILeagueRepository } from '../../app/ports/league.repository.interface';
import { LeagueRepository } from '../../repository/league.repository';

@Module({
  imports: [CqrsModule, ConfigModule],
  controllers: [RetrieveLeaguesController],
  providers: [RetrieveLeaguesQueryHandler, { provide: ILeagueRepository, useClass: LeagueRepository }, PrismaService],
})
export class RetrieveLeaguesModule {}
