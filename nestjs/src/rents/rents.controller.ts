import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { combineLatest, from, map, of, switchMap, tap } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { EstatesService } from '../estates/estates.service';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { LodgersService } from '../lodgers/lodgers.service';
import { OwnersService } from '../owners/owners.service';
import { createRentReceiptEmail, createRentReciptPdf } from './rents.business';
import { sendEmail } from 'src/emails/emails.buisness';




@Controller('api/rents')
export class RentsController {

    constructor(private estateService: EstatesService, private ownerService: OwnersService, private lodgerService: LodgersService) { }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('pdf')
    downloadRentReceipt(@Req() req, @Res() res) {

        const { id } = req.query;

        return combineLatest([
            this.estateService.getById(id),
            this.ownerService.getByUser(req.user.id),
            this.lodgerService.getByUser(req.user.id)
        ]).pipe(
            switchMap(([estate, owners, lodgers]) => {
                const owner = owners.find(owner => owner.id === estate.owner_id);
                const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
                return from(createRentReciptPdf(estate, owner, {...lodger, email: req.user.email}));
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

        const { id } = req.query;

        return combineLatest([
            this.estateService.getById(id),
            this.ownerService.getByUser(req.user.id),
            this.lodgerService.getByUser(req.user.id).pipe(map(lodgers => lodgers.map(lodger => ({...lodger, email: req.user.email}))))
        ]).pipe(
            switchMap(([estate, owners, lodgers]) => createRentReceiptEmail( owners, lodgers, estate)),
            switchMap(base64EncodedEmail => sendEmail(req.user.accessToken, req.user.refresh_token, base64EncodedEmail)),
            map(() => (res.send({ statusCode: 200, body: 'email sent successfully' })))
        );

    }

}