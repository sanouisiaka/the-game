import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { IFixtureRepository } from '../../app/ports/fixture.repository.interface';
import { FixtureRepository } from '../../repository/command/fixture.repository';
import { PrismaService } from '../prisma.service';
import { UpdateFixtureCommandHandler } from '../../app/commands/usecases/updateFixture/updateFixture.command.handler';

@Module({
  imports: [CqrsModule, ConfigModule],
  providers: [UpdateFixtureCommandHandler, { provide: IFixtureRepository, useClass: FixtureRepository }, PrismaService],
})
export class updateFixtureModule {}
