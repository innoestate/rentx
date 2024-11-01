import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User from google',
      user: req.user,
    };
  }
}