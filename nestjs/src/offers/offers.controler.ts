import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { of } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { OffersService } from './services/offers.service';
import { OfferDto } from './models/offer.dto';
import { ProspectionsDbService } from 'src/prospections/services/prospections.db.service';
import { FolderStorageGoogleDriveStrategy } from 'src/storage/strategy/folder-storage.google_drive.strategy';
import { ConfigService } from '@nestjs/config';
import { addOffer } from './offers.business';

@Controller('api/prospections/offers')
export class OffersController {
    constructor(
        private readonly offersService: OffersService,
        private prospectionsDbService: ProspectionsDbService,
        private configService: ConfigService
    ) { }


    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post('add')
    async createOffer(@Body() body: any, @Req() req) {

        console.log('offers to add');
        const price = req.query.price;
        const prospection_id = req.query.prospection_id;
        console.log('prospection_id', prospection_id);
        console.log('price', price);

        const prospection = await this.prospectionsDbService.findOne(prospection_id);
        console.log('prospection', prospection);

        console.log('body', body);

        const storageStrategy = new FolderStorageGoogleDriveStrategy();
        await storageStrategy.init(req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'));
        await storageStrategy.addFile(prospection.storage_folder_id, body.file, 'offer_test.pdf');

        // return await addOffer(prospection, offer, file);

    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('offers')
    findAllOffers() {
        return of(null);
    }
}
