import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { IFootballRepository } from './app/domain/ports/football.repository.interface';
import { ApiFootballRepository } from './repository/apiFootball/apiFootball.repository';
import { GetIncomingFixtures } from './app/usecases/getIncomingFixtures';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GetFixturesOdds } from './app/usecases/getFixturesOdds';
import { GetTeams } from './app/usecases/getTeams';
import { UpdateFixtures } from './app/usecases/updateFixtures';
import configuration from './config/configuration';
import { UpdateFixtureScheduler } from './app/scheduler/updateFixtureScheduler';
import { GetFixturesOddsScheduler } from './app/scheduler/getFixturesOddsScheduler';
import { GetIncomingFixturesScheduler } from './app/scheduler/getIncomingFixturesScheduler';
import { GetTeamsScheduler } from './app/scheduler/getTeamsScheduler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ScheduleModule.forRoot(),
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'FOOT_DATA_SERVICE',
        useFactory: async (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get('TCP_HOST'),
            port: parseInt(config.get('TCP_PORT')),
          },
        }),
      },
    ]),
  ],
  controllers: [],
  providers: [
    { provide: IFootballRepository, useClass: ApiFootballRepository },
    GetTeamsScheduler,
    GetIncomingFixturesScheduler,
    UpdateFixtureScheduler,
    GetFixturesOddsScheduler,
    GetTeams,
    GetIncomingFixtures,
    UpdateFixtures,
    GetFixturesOdds,
  ],
})
export class SportDataFetcherModule {}
