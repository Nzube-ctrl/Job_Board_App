import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Hello World!';
  // }

  jobBoardApi(): string {
    return `Job Board API`
  }
}
