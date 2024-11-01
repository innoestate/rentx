import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/index.html', 302)
  redirectToAngular() {
    return { url: '/index.html' };
  }
}
