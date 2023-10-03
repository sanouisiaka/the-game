import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from '../../repository/user.repository';
import { PrismaService } from '../prisma.service';
import { IUserRepository } from '../../app/ports/user.repository.interface';
import { ConfigModule } from '@nestjs/config';
import { RetrieveConnectedUserQueryHandler } from '../../app/queries/usecases/retrieveConnectedUser/retrieveConnectedUser.query.handler';
import { RetrieveConnectedUserController } from '../../api/usecases/retrieveConnectedUser/retrieveConnectedUser.controller';

@Module({
  imports: [CqrsModule, ConfigModule],
  controllers: [RetrieveConnectedUserController],
  providers: [RetrieveConnectedUserQueryHandler, { provide: IUserRepository, useClass: UserRepository }, PrismaService],
})
export class RetrieveConnectedUserModule {}
