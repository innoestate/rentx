import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';

@Controller('api/user')
export class UserController {

    constructor() { }

    @Get('hello')
    sayHello(@Req() req) {
        return 'hello world!';
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
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