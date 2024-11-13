import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// Defines the controller for handling HTTP requests and responses at the application level.

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/bye')
  getBye() {
    return "Bye!";
  }
}