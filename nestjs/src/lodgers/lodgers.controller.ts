import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { catchError, of } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { Lodger_Post } from './lodger-post.model';
import { LodgersService } from './lodgers.service';
import { handleTypeormError } from '../utils/error-typeorm-http.handler';
import { formatLodgerPost } from './lodger-utils.model';
import { LodgerPatch } from './lodger-patch.model';

@Controller('api')
export class LodgersController {

    constructor(private lodgerService: LodgersService) { }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('lodgers')
    getOwners(@Req() req) {
        return this.lodgerService.getByUser(req.user?.id).pipe(
            catchError(err => {
                console.error(err);
                return of(err);
            })
        )
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post('lodgers')
    postOwner(@Req() req, @Body() lodgerPost: Lodger_Post) {
        const formatedLodgerPost = formatLodgerPost(lodgerPost, req.user.id);
        return this.lodgerService.create(formatedLodgerPost).pipe(
            catchError(err => {
                handleTypeormError(err);
                return of(err);
            })
        )
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Patch('lodgers')
    patchOwners(@Req() req, @Body() lodgerPatch: Partial<LodgerPatch>) {
        return this.lodgerService.update(lodgerPatch).pipe(
            catchError(err => {
                handleTypeormError(err);
                return of(err);
            })
        )
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Delete('lodgers')
    deleteOwner(@Req() req, @Body() body : { id: string }) {
        return this.lodgerService.delete(body.id).pipe(
            catchError(err => {
                handleTypeormError(err);
                return of(err);
            })
        )
    }

}