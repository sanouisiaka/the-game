import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { ReceiveFixtureController } from '../../api/usecases/receiveFixture/receiveFixture.controller';
import { ReceiveFixtureCommandHandler } from '../../app/commands/usecases/receiveFixture/receiveFixture.command.handler';
import { IFixtureRepository } from '../../app/ports/fixture.repository.interface';
import { FixtureRepository } from '../../repository/fixture.repository';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [CqrsModule, ConfigModule],
  controllers: [ReceiveFixtureController],
  providers: [ReceiveFixtureCommandHandler, { provide: IFixtureRepository, useClass: FixtureRepository }, PrismaService],
})
export class ReceiveFixtureModule {}
