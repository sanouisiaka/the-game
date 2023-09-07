import { NestFactory } from '@nestjs/core';
import { ExampleModule } from './config/modules/example.module';

async function bootstrap() {
  const app = await NestFactory.create(ExampleModule);
  await app.listen(3000);
}
bootstrap();
