import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { OffersService } from './services/offers.service';
import { OffersDbService } from './services/offers.db.service';
import { ProspectionsDbService } from '../prospections/services/prospections.db.service';
import { ConfigService } from '@nestjs/config';
import { OfferDto } from './models/offer.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { GoogleConnect } from 'src/google/models/google.connect.model';
import { catchError, from, map } from 'rxjs';
import { SellersDbService } from '../prospections/services/sellers.db.service';
import { createOfferEmail } from './utils/offers.email.utils';
import { sendEmail } from '../emails/emails.buisness';

@Controller('api/offers')
export class OffersController {
    constructor(
        private readonly offersService: OffersService,
        private readonly offersServiceDb: OffersDbService,
        private prospectionsDbService: ProspectionsDbService,
        private sellersDbService: SellersDbService,
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
        return await this.offersServiceDb.create({
            ...offerDto,
            user_id: req.user?.id
        });
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Patch('update/:id')
    async updateOffer(@Param('id') id: string, @Body() offerDto: Partial<OfferDto>, @Req() req) {
        const existingOffer = await this.offersServiceDb.findOne(id);
        if (existingOffer?.user_id !== req.user?.id) {
            throw new Error('Unauthorized');
        }
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
        return await this.offersServiceDb.update(id, offerDto);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Delete('delete/:id')
    async deleteOffer(@Param('id') id: string, @Req() req) {
        const existingOffer = await this.offersServiceDb.findOne(id);
        if (existingOffer?.user_id !== req.user?.id) {
            throw new Error('Unauthorized');
        }
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

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post('send-pdf/:prospectionId')
    async sendOfferPdf(
        @Param('prospectionId') prospectionId: string,
        @Body() body: { pdfFile: string, emailBody: string },
        @Req() req,
        @Res() res
    ) {

        try {
            const { accessToken, refresh_token } = req.user;
            const clientId = this.configService.get('GOOGLE_CLIENT_ID');
            const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');

            const google: GoogleConnect = {
                accessToken,
                refreshToken: refresh_token,
                clientId,
                clientSecret
            };

            // Get the prospection
            const prospection = await this.prospectionsDbService.findOne(prospectionId);
            if (!prospection) {
                return res.status(404).send({ statusCode: 404, message: 'Prospection not found' });
            }

            // Get the seller
            const seller = await this.sellersDbService.findOneSeller(prospection.seller_id);
            if (!seller || !seller.email) {
                return res.status(400).send({ statusCode: 400, message: 'Seller email not found' });
            }
            console.log('seller', seller);

            // Check the pdf file provided in the request
            if (!body.pdfFile) {
                return res.status(400).send({ statusCode: 400, message: 'PDF file is required' });
            }

            // Check the email body provided in the request
            if (!body.emailBody) {
                return res.status(400).send({ statusCode: 400, message: 'Email body is required' });
            }

            const subject = `Offre pour votre bien`;


            console.log('pdfFile', !!body.pdfFile);
            // Create the email with attachment
            const base64Email = createOfferEmail(
                body.emailBody,
                Buffer.from(body.pdfFile, 'base64'),
                seller.email,
                subject
            );

            console.log('send email', !!base64Email);

            // Send the email
            return sendEmail(
                accessToken,
                refresh_token,
                base64Email,
                clientId,
                clientSecret
            ).pipe(
                map(() => res.status(200).send({ statusCode: 200, message: 'Email sent successfully' })),
                catchError(error => {
                    console.error('Error sending email:', error);
                    return from(res.status(500).send({ 
                        statusCode: 500, 
                        message: 'Failed to send email',
                        error: error.message 
                    }));
                })
            );

        } catch (error) {
            console.error('Error sending offer PDF:', error);
            return res.status(500).send({ statusCode: 500, message: 'Internal server error' });
        }
    }
}
