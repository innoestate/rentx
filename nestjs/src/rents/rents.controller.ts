import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { combineLatest, from, map, switchMap, tap } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { OwnersService } from '../owners/owners.service';
import { LodgersService } from '../lodgers/lodgers.service';
import { EstatesService } from '../estates/estates.service';
import { createRentReciptPdf } from './rents.business';

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
                return from(createRentReciptPdf(estate, owner, lodger));
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
            this.lodgerService.getByUser(req.user.id)
        ]).pipe(
            switchMap(([estate, owners, lodgers]) => {
                const owner = owners.find(owner => owner.id === estate.owner_id);
                const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
                return from(createRentReciptPdf(estate, owner, lodger));
            }),
            tap(rentReceipt => {
                // send email
            })
        );

    }

}