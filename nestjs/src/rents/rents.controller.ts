import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { combineLatest, from, map, of, switchMap } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { sendEmail } from '../emails/emails.buisness';
import { EstatesService } from '../estates/estates.service';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { LodgersService } from '../lodgers/lodgers.service';
import { OwnersService } from '../owners/owners.service';
import { createRentReceiptEmail, createRentReciptPdf } from './rent-receipts.business';
import { RentsService } from './rents.service';
import { createSheet } from './rents.sheets.buisness';


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
    @Get('pdf')
    downloadRentReceipt(@Req() req, @Res() res) {

        const id = req.query.estate;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        return combineLatest([
            this.estateService.getById(id),
            this.ownerService.getByUser(req.user.id),
            this.lodgerService.getByUser(req.user.id)
        ]).pipe(
            switchMap(([estate, owners, lodgers]) => {
                const owner = owners.find(owner => owner.id === estate.owner_id);
                const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
                return this.rentsService.buildRentReciptPdf(estate, owner, { ...lodger, email: req.user.email }, startDate, endDate);
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

        const id = req.query?.estate;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;

        return combineLatest([
            this.estateService.getById(id),
            this.ownerService.getByUser(req.user.id),
            this.lodgerService.getByUser(req.user.id)
        ]).pipe(
            switchMap(([estate, owners, lodgers]) => createRentReceiptEmail(owners, lodgers, estate, startDate, endDate)),
            switchMap(base64EncodedEmail => sendEmail(req.user.accessToken, req.user.refresh_token, base64EncodedEmail, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'))),
        );

    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('sheets')
    synchronizeSheets(@Req() req, @Res() res) {


        return combineLatest([
            this.estateService.getByUser(req.user.id),
            this.ownerService.getByUser(req.user.id),
            this.lodgerService.getByUser(req.user.id)
        ]).pipe(
            switchMap(([estates, owners, lodgers]) =>from(createSheet(estates, owners, lodgers, req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET')))),
        );

        // return from(createSheet(req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'))).pipe(
        //     tap(() => console.log('sheets synchronized successfully'))
        // );
    }

}