import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, combineLatest, from, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { DocsDbService } from 'src/docs/docs.db.service';
import { Estate_filled_Db } from 'src/estates/estate-filled-db.model';
import { GoogleConnect } from 'src/google/models/google.connect.model';
import { JwtAuthGuard } from '../auth/auth.guard';
import { EstatesService } from '../estates/estates.service';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { LodgersService } from '../lodgers/lodgers.service';
import { OwnersService } from '../owners/owners.service';
import { createRentReciptPdf } from './rent-receipts/rent-receipts.business';
import { RentsDbService } from './services/rents.db.service';
import { RentsService } from './services/rents.service';


@Controller('api/rents')
export class RentsController {

    constructor(private estateService: EstatesService,
        private ownerService: OwnersService,
        private lodgerService: LodgersService,
        private configService: ConfigService,
        private rentsDbService: RentsDbService,
        private docsDbService: DocsDbService,
        private rentsService: RentsService) { }

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
            console.error('error', error);
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

        const google: GoogleConnect = {
            accessToken,
            refreshToken: refresh_token,
            clientId,
            clientSecret
        }

        return combineLatest([
            this.estateService.getById(id),
            this.ownerService.getByUser(req.user.id),
            this.lodgerService.getByUser(req.user.id)
        ]).pipe(
            switchMap(([estate, owners, lodgers]) => {
                const owner = owners.find(owner => owner.id === estate.owner_id);
                const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
                return this.rentsService.buildRentReceiptPdf(req.user.id, estate, owner, { ...lodger, email: req.user.email }, startDate, endDate, accessToken, refresh_token, clientId, clientSecret).pipe(
                    tap(() => this.synchronizeGoogleSheets(req.user.id, google).subscribe())
                );
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

        const google: GoogleConnect = {
            accessToken,
            refreshToken: refresh_token,
            clientId,
            clientSecret
        }

        return this.rentsService.SendRentReceiptByEmail(req.user.id, estateId, accessToken, refresh_token, clientId, clientSecret, startDate, endDate).pipe(
            tap(() => this.synchronizeGoogleSheets(req.user.id, google).subscribe()),
            map(_ => res.send({ statusCode: 200, body: 'email sent' }))
        );

    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('sheets')
    synchronizeSheets(@Req() req, @Res() res) {

        const { accessToken, refresh_token } = req.user;
        const clientId = this.configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');

        const google: GoogleConnect = {
            accessToken,
            refreshToken: refresh_token,
            clientId,
            clientSecret
        }

        return this.synchronizeGoogleSheets(req.user.id, google).pipe(
            map(_ => res.send({ statusCode: 200, body: 'sheets synchronized' }))
        );
        // return this.rentsService.synchronizeRentsInGoogleSheet(req.user.id, req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET')).pipe(
        //     map(result => {
        //         res.setHeader('Content-Type', 'application/pdf');
        //         res.setHeader('Content-Disposition', 'attachment; filename=quittance.pdf');
        //         res.send(result)
        //     })
        // );
    }

    synchronizeGoogleSheets(userId: string, google: GoogleConnect) {
        return combineLatest([
            this.getFullEstates(userId),
            this.rentsDbService.getByUserId(userId),
            this.getSpreadSheetId(userId)
        ]).pipe(
            take(1),
            switchMap(([estates, rents, spreadSheetId]) => {
                return this.rentsService.synchronizeRentsInGoogleSheet2({ estates, rents, spreadSheetId, google });
            }),
            switchMap(spreadSheet => this.updateSpreadSheetId(userId, spreadSheet?.id)),
            catchError(err => {
                console.error('fail synchronize and save rents google sheets', err);
                return of(null);
            })
        );
    }

    private getFullEstates(userId: string): Observable<Estate_filled_Db[]> {
        return combineLatest([this.estateService.getByUser(userId), this.ownerService.getByUser(userId), this.lodgerService.getByUser(userId)]).pipe(
            take(1),
            map(([estates, owners, lodgers]) => estates.map(estate => {
                const owner = owners.find(owner => owner.id === estate.owner_id);
                const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
                return { ...estate, owner, lodger };
            })
            )
        );
    }

    private updateSpreadSheetId(userId: string, spreadSheetId: string) {
        try {
            return this.docsDbService.getByUser(userId).pipe(
                take(1),
                switchMap(docs => {
                    if(docs?.length > 0){
                        return this.docsDbService.update({ id: docs[0].id, rents_google_sheet_id: spreadSheetId });
                    }else{
                        return this.docsDbService.create({ user_id: userId, rents_google_sheet_id: spreadSheetId });
                    }
                }),
                catchError(e => {
                    console.error('error fetching user doc by userId', e);
                    return of(null);
                })
            );
        }catch(e){
            console.error('error updating user doc by userId', e);
            return of(null);
        }
    }

    private getSpreadSheetId(userId: string) {
        return this.docsDbService.getByUser(userId).pipe(
            map(docs => {
                return docs[0]?.rents_google_sheet_id;
            })
        );
    }

}