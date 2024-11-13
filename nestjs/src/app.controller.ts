import { Controller, Get, Redirect, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/home')
  getHome(@Req() req) {
      return 'welcom to rentX api';
  }

  // @Get()
  // @Redirect('/index.html', 302)
  // redirectToAngular() {
  //   return { url: '/index.html' };
  // }
}
