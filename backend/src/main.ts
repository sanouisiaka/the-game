import { NestFactory } from '@nestjs/core';
import { AppModule } from './config/app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: parseInt(process.env.TCP_PORT),
    },
  });
  await app.startAllMicroservices();

  //enable cors
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(process.env.BACKEND_PORT));
}

bootstrap();
