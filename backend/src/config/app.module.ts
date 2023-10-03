import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateUserModule } from './modules/createUser.module';
import { RetrieveConnectedUserModule } from './modules/retrieveConnectedUser.module';

@Module({
  imports: [CreateUserModule, RetrieveConnectedUserModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [],
})
export class AppModule {}
