import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Get('dev/login')
  devLogin(@Req() req) {
    console.log('devLogin called');
    const devUser = {
      email: 'JohnDoe@dev.com',
      firstName: 'John',
      lastName: 'Doe',
      picture: 'https://example.com/johndoe.jpg',
      accessToken: 'factice-access-token',
      refreshToken: 'factice-refresh-token'
    }
    return this.authService.googleLogin({user: devUser});
  }

}