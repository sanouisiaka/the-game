import { NestFactory } from '@nestjs/core';
import { AppModule } from './config/app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 8123,
    },
  });
  await app.startAllMicroservices();

  //enable cors
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}

bootstrap();
