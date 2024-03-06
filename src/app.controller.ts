import { Controller, Get, Param, Query, ParseArrayPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return "Hola mundo";
  }

  @Get('nuevo')
  newEndpoiunt() {
    return "Yo soy nuevo";
  }

}
