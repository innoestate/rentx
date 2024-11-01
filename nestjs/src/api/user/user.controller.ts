import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/auth.guard';
import { UsersService } from './user.service';
import { catchError, map } from 'rxjs';

@Controller('api/user')
export class UserController {

    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return this.usersService.findById(req.user.id).pipe(
            map(user => {
                return {...user, req.user};
            }),
            catchError(e => {
                return this.usersService.create(req.user?.email)
            })
        )
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout(@Req() req) {
      return { message: 'Logged out successfully' };
    }

}