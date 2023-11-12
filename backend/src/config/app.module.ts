import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateUserModule } from './modules/createUser.module';
import { RetrieveConnectedUserModule } from './modules/retrieveConnectedUser.module';
import { ReceiveFixtureModule } from './modules/receiveFixture.module';
import { ReceiveTeamModule } from './modules/receiveTeam.module';
import { ReceiveBetModule } from './modules/receiveBet.module';
import { CreateFixtureModule } from './modules/createFixture.module';
import { UpdateFixtureModule } from './modules/updateFixture.module';
import { CreateTeamModule } from './modules/createTeam.module';
import { UpdateWinnerBetModule } from './modules/updateWinnerBet.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    CreateUserModule,
    RetrieveConnectedUserModule,
    ReceiveFixtureModule,
    ReceiveTeamModule,
    ReceiveBetModule,
    CreateFixtureModule,
    UpdateFixtureModule,
    CreateTeamModule,
    UpdateWinnerBetModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
