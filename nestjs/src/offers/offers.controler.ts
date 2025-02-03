import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { ProspectionsDbService } from '../prospections/services/prospections.db.service';
import { OffersDbService } from './services/offers.db.service';
import { OffersService } from './services/offers.service';

@Controller('api/prospections/offers')
export class OffersController {
    constructor(
        private readonly offersService: OffersService,
        private readonly offersServiceDb: OffersDbService,
        private prospectionsDbService: ProspectionsDbService,
        private configService: ConfigService
    ) { }


    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post('add')
    async createOffer(@Body() body: any, @Req() req) {

        const price = req.query.price as number;
        const prospection_id = req.query.prospection_id;

        const offerDto = await this.offersService.addOffer(req.user?.id, prospection_id, { price, prospection_id }, body.file, req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'));

        return offerDto;

    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('get')
    async findAllOffers(@Req() req) {
        return await this.offersServiceDb.findAllByUser(req.user?.id);
    }
}
