import { Controller, Get, UseGuards } from '@nestjs/common';
import { ExampleService } from '../../../app/usecases/example/example.service';
import { AuthGuard } from '../../../config/auth/auth.guard';

@Controller()
@UseGuards(AuthGuard)
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('/example')
  getHello(): string {
    return this.exampleService.getHello();
  }
}
