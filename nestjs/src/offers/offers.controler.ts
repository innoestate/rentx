import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { OffersService } from './services/offers.service';
import { OffersDbService } from './services/offers.db.service';
import { ProspectionsDbService } from '../prospections/services/prospections.db.service';
import { ConfigService } from '@nestjs/config';
import { OfferDto } from './models/offer.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';

@Controller('api/offers')
export class OffersController {
    constructor(
        private readonly offersService: OffersService,
        private readonly offersServiceDb: OffersDbService,
        private prospectionsDbService: ProspectionsDbService,
        private configService: ConfigService
    ) { }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('by-prospection/:prospectionId')
    async getOffersByProspectionId(@Param('prospectionId') prospectionId: string, @Req() req) {
        return await this.offersServiceDb.findByProspectionId(prospectionId);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post('add')
    async createOffer(@Body() offerDto: OfferDto, @Req() req) {
        // If file is provided, handle it with Google Drive
        if (offerDto.file) {
            return await this.offersService.addOffer(
                req.user?.id,
                offerDto.prospection_id,
                offerDto,
                offerDto.file,
                req.user.accessToken,
                req.user.refresh_token,
                this.configService.get('GOOGLE_CLIENT_ID'),
                this.configService.get('GOOGLE_CLIENT_SECRET')
            );
        }
        
        // If no file, just create the offer with markdown
        return await this.offersServiceDb.create({
            ...offerDto,
            user_id: req.user?.id
        });
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Patch('update/:id')
    async updateOffer(@Param('id') id: string, @Body() offerDto: Partial<OfferDto>, @Req() req) {
        // Verify ownership
        const existingOffer = await this.offersServiceDb.findOne(id);
        if (existingOffer?.user_id !== req.user?.id) {
            throw new Error('Unauthorized');
        }

        // If updating with a new file, handle Google Drive
        if (offerDto.file) {
            return await this.offersService.updateOffer(
                id,
                offerDto,
                offerDto.file,
                req.user.accessToken,
                req.user.refresh_token,
                this.configService.get('GOOGLE_CLIENT_ID'),
                this.configService.get('GOOGLE_CLIENT_SECRET')
            );
        }

        // If no file update, just update the offer
        return await this.offersServiceDb.update(id, offerDto);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Delete('delete/:id')
    async deleteOffer(@Param('id') id: string, @Req() req) {
        // Verify ownership
        const existingOffer = await this.offersServiceDb.findOne(id);
        if (existingOffer?.user_id !== req.user?.id) {
            throw new Error('Unauthorized');
        }

        // If offer has a Google Drive file, delete it
        if (existingOffer.google_drive_id) {
            await this.offersService.deleteOfferFile(
                existingOffer.google_drive_id,
                req.user.accessToken,
                req.user.refresh_token,
                this.configService.get('GOOGLE_CLIENT_ID'),
                this.configService.get('GOOGLE_CLIENT_SECRET')
            );
        }

        await this.offersServiceDb.delete(id);
        return { success: true };
    }
}
