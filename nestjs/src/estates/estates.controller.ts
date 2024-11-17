import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { of, catchError } from 'rxjs';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { JwtAuthGuard } from '../auth/auth.guard';
import { EstatesService } from './estates.service';
import { Estate_Dto } from './estate-dto.model';
import { formatEstateDtoToEstateDb } from './estate.utils';
import { handleTypeormError } from '../utils/error-typeorm-http.handler';

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
    patchEstates(@Req() req, @Body() estateDto: Estate_Dto) {
        const estate_db = formatEstateDtoToEstateDb(estateDto, req.user?.id);
        return this.estateService.update(estate_db).pipe(
            catchError(err => {
                handleTypeormError(err);
                return of(err);
            })
        )
    }

}