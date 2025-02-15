import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private configService: ConfigService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Post('google/dev/login')
  devLogin(@Body() body) {
    if(this.configService.get('NODE_ENV') !== 'development') {
      throw new Error('Not allowed');
    }
    return this.authService.googleLogin(body);
  }

}