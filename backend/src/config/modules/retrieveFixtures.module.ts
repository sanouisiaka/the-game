import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '../prisma.service';
import { ConfigModule } from '@nestjs/config';
import { FixtureRepository } from '../../repository/fixture.repository';
import { IFixtureRepository } from '../../app/ports/fixture.repository.interface';
import { RetrieveFixturesQueryHandler } from '../../app/queries/usecases/retrieveFixtures/retrieveFixtures.query.handler';
import { RetrieveFixturesController } from '../../api/usecases/retrieveFixtures/retrieveFixtures.controller';

@Module({
  imports: [CqrsModule, ConfigModule],
  controllers: [RetrieveFixturesController],
  providers: [RetrieveFixturesQueryHandler, { provide: IFixtureRepository, useClass: FixtureRepository }, PrismaService],
})
export class RetrieveFixturesModule {}
