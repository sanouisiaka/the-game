import { NestFactory } from '@nestjs/core';
import { SportDataFetcherModule } from './sportDataFetcher.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(SportDataFetcherModule);
}

bootstrap();
