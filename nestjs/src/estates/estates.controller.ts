import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { catchError, of } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { handleTypeormError } from '../utils/error-typeorm-http.handler';
import { Estate_Dto } from './estate-dto.model';
import { formatEstateDtoToEstateDb } from './estate.utils';
import { EstatesService } from './estates.service';

@Controller('api')
export class EstatesController {

    constructor(private estateService: EstatesService) { }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('estates')
    getEstates(@Req() req) {
        return this.estateService.getByUser(req.user?.id);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post('estates')
    postEstates(@Req() req, @Body() estateDto: Estate_Dto) {
        const estate_db = formatEstateDtoToEstateDb(estateDto, req.user?.id);
        return this.estateService.create(estate_db).pipe(
            catchError(err => {
                handleTypeormError(err);
                return of(err);
            })
        )
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Patch('estate')
    patchEstates(@Req() req, @Body() estateDto: Partial<Estate_Dto>) {
        return this.estateService.update(estateDto as any).pipe(
            catchError(err => {
                handleTypeormError(err);
                return of(err);
            })
        )
    }

}