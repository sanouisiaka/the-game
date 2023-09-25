import { NestFactory } from '@nestjs/core';
import { AppModule } from './config/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //enable cors
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}
bootstrap();
