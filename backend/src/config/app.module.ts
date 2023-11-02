import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateUserModule } from './modules/createUser.module';
import { RetrieveConnectedUserModule } from './modules/retrieveConnectedUser.module';
import { ReceiveFixtureModule } from './modules/receiveFixture.module';

@Module({
  imports: [CreateUserModule, RetrieveConnectedUserModule, ReceiveFixtureModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [],
})
export class AppModule {}
