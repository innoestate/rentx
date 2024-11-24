import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { of } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { OwnersService } from '../owners/owners.service';
import { LodgersService } from '../lodgers/lodgers.service';
import { EstatesService } from '../estates/estates.service';
import { createRentReciptPdf } from './rents.buisness';

@Controller('api/rents')
export class RentsController {

    constructor(private estateService: EstatesService, private ownerService: OwnersService, private lodgerService: LodgersService) { }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('pdf')
    async getOwners(@Req() req, @Res() res) {
        const rentReceipt = await createRentReciptPdf();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=quittance.pdf');
        res.send(rentReceipt)
    }

}