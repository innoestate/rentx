import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { combineLatest, from, map, of, switchMap, take, tap } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { sendEmail } from '../emails/emails.buisness';
import { EstatesService } from '../estates/estates.service';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { LodgersService } from '../lodgers/lodgers.service';
import { OwnersService } from '../owners/owners.service';
import { createRentReceiptEmail, createRentReciptPdf } from './rent-receipts/rent-receipts.business';
import { RentsService } from './services/rents.service';


@Controller('api/rents')
export class RentsController {

    constructor(private estateService: EstatesService, private ownerService: OwnersService, private lodgerService: LodgersService, private configService: ConfigService, private rentsService: RentsService) { }

    @Post('downloadPdf')
    downloadPdfRentReceipt(@Req() req, @Res() res) {
        try {
            const { estate, owner, lodger, startDate } = req.body;
            return from(createRentReciptPdf(estate, owner, lodger, startDate)).pipe(
                map(rentReceipt => {
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'attachment; filename=quittance.pdf');
                    res.send(rentReceipt)
                }));
        } catch (error) {
            console.log('error', error);
            return of(res.send({ statusCode: 500, body: 'error' }));
        }
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('')
    getRents(@Req() req, @Res() res) {
        return this.rentsService.getMonthlyRents(req.user.id).pipe(
            map(rents => {
                res.send(rents)
            })
        );
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('pdf')
    downloadRentReceipt(@Req() req, @Res() res) {

        const id = req.query.estate;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const { accessToken, refresh_token } = req.user;
        const clientId = this.configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');

        return combineLatest([
            this.estateService.getById(id),
            this.ownerService.getByUser(req.user.id),
            this.lodgerService.getByUser(req.user.id)
        ]).pipe(
            switchMap(([estate, owners, lodgers]) => {
                const owner = owners.find(owner => owner.id === estate.owner_id);
                const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
                return this.rentsService.buildRentReciptPdf(req.user.id, estate, owner, { ...lodger, email: req.user.email }, startDate, endDate, accessToken, refresh_token, clientId, clientSecret);
            }),
            map(rentReceipt => {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=quittance.pdf');
                res.send(rentReceipt)
            })
        );
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('email')
    sendRentReceipt(@Req() req, @Res() res) {

        const estateId = req.query?.estate;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const { accessToken, refresh_token } = req.user;
        const clientId = this.configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');

        return this.rentsService.SendRentReceiptByEmail(req.user.id, estateId, accessToken, refresh_token, clientId, clientSecret, startDate, endDate).pipe(
            map(_ => res.send({ statusCode: 200, body: 'email sent' })) 
        );

    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('sheets')
    synchronizeSheets(@Req() req, @Res() res) {
        return this.rentsService.synchronizeRentsInGoogleSheet(req.user.id,req.user.accessToken, req.user.refresh_token,this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET')).pipe(
            map( result => {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=quittance.pdf');
                res.send(result)
            })
        );
    }

}