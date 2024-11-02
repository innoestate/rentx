import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { map } from 'rxjs';
import { UsersService } from '../user/user.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('api/user')
export class UserController {

    constructor(private usersService: UsersService) { }

    @Get('hello')
    sayHello(@Req() req) {
        return 'hello';
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        if( req.user.id ){
            return this.usersService.findById(req.user.id).pipe(
                map(user => ({...user, ...req.user}))
            );
        }else if (req.user.email) {
            return this.usersService.create(req.user.email).pipe(
                map(user => ({...user, ...req.user}))
            )
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout(@Req() req) {
        return { message: 'Logged out successfully' };
    }

}