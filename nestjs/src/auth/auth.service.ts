import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService) {}

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const token = this.jwtService.sign({
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
      googleAccessToken: req.user.accessToken,
      googleRefreshToken: req.user.refreshToken
    });
    return {
      message: 'User from google',
      user: req.user,
      token,
    };
  }
}