import { Module } from '@nestjs/common';
import { CreateUserController } from '../../api/usecases/createUser/createUser.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommandHandler } from '../../app/commands/usecases/createUser/createUser.command.handler';
import { UserRepository } from '../../repository/user.repository';
import { PrismaService } from '../prisma.service';
import { IUserRepository } from '../../app/ports/user.repository.interface';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CqrsModule, ConfigModule],
  controllers: [CreateUserController],
  providers: [{ provide: IUserRepository, useClass: UserRepository }, CreateUserCommandHandler, PrismaService],
})
export class CreateUserModule {}
