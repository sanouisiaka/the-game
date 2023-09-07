import { Module } from '@nestjs/common';
import { ExampleController } from '../../api/usecases/example/example.controller';
import { ExampleService } from '../../app/usecases/example/example.service';

@Module({
  imports: [],
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
