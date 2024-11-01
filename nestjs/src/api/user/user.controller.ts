import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';

@Controller('api/user')
export class UserController {

    @Get('hello')
    sayHello(@Req() req) {
        return 'hello';
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout(@Req() req) {
      return { message: 'Logged out successfully' };
    }

}