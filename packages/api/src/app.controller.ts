import { Controller, Get, Query } from '@nestjs/common';
import { AppService, GetByLocationQueryParams } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/by-location')
  getByLocation(@Query() queryParams: GetByLocationQueryParams): any {
    return this.appService.getByLocation(queryParams);
  }
}
