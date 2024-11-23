import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { catchError, of, tap } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { handleTypeormError } from '../utils/error-typeorm-http.handler';
import { OwnersService } from './owners.service';
import { Estate_Dto } from 'src/estates/estate-dto.model';
import { Owner_Dto } from './owners-dto.model';
import { formatOwner } from './owners-db.model';

@Controller('api')
export class OwnerController {

    constructor(private ownerService: OwnersService) { }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('owners')
    getOwners(@Req() req) {
        return this.ownerService.getByUser(req.user?.id).pipe(
            catchError(err => {
                console.error(err);
                return of(err);
            })
        )
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post('owners')
    postOwner(@Req() req, @Body() ownerDto: Owner_Dto) {
        return this.ownerService.create(formatOwner({...ownerDto, user_id: req.user?.id})).pipe(
            catchError(err => {
                handleTypeormError(err);
                return of(err);
            })
        )
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Patch('owners')
    patchOwners(@Req() req, @Body() ownerDto: Partial<Estate_Dto>) {
        return this.ownerService.update(ownerDto as any).pipe(
            catchError(err => {
                handleTypeormError(err);
                return of(err);
            })
        )
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Delete('owners')
    deleteOwner(@Req() req, @Body() ownerDto: { id: string }) {
        return this.ownerService.delete(ownerDto.id).pipe(
            catchError(err => {
                handleTypeormError(err);
                return of(err);
            })
        )
    }

}