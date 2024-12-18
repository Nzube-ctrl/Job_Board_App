import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  jobBoardApi(): string {
    return this.appService.jobBoardApi();
  }
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
