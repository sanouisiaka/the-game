import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '../prisma.service';
import { ConfigModule } from '@nestjs/config';
import { RetrieveFixturesQueryHandler } from '../../app/queries/usecases/retrieveFixtures/retrieveFixtures.query.handler';
import { RetrieveFixturesController } from '../../api/usecases/retrieveFixtures/retrieveFixtures.controller';
import { IFixtureQueryRepository } from '../../app/ports/query/fixture.query.repository.interface';
import { FixtureQueryRepository } from '../../repository/fixture.query.repository';

@Module({
  imports: [CqrsModule, ConfigModule],
  controllers: [RetrieveFixturesController],
  providers: [RetrieveFixturesQueryHandler, { provide: IFixtureQueryRepository, useClass: FixtureQueryRepository }, PrismaService],
})
export class RetrieveFixturesModule {}
