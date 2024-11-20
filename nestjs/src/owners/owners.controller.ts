import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { catchError, of } from 'rxjs';
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
    getEstates(@Req() req) {
        return this.ownerService.getByUser(req.user?.id);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post('owners')
    postEstates(@Req() req, @Body() ownerDto: Owner_Dto) {
        return this.ownerService.create(formatOwner({...ownerDto, user_id: req.user?.id})).pipe(
            catchError(err => {
                handleTypeormError(err);
                return of(err);
            })
        )
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Patch('owners')
    patchEstates(@Req() req, @Body() ownerDto: Partial<Estate_Dto>) {
        return this.ownerService.update(ownerDto as any).pipe(
            catchError(err => {
                handleTypeormError(err);
                return of(err);
            })
        )
    }

}