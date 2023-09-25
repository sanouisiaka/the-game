import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateUserModule } from './modules/createUser.module';

@Module({
  imports: [CreateUserModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [],
})
export class AppModule {}
