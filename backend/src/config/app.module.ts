import { Module } from '@nestjs/common';
import { ExampleModule } from './modules/example.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ExampleModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [],
})
export class AppModule {}
