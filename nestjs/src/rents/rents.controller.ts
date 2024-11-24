import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { of } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { OwnersService } from '../owners/owners.service';
import { LodgersService } from '../lodgers/lodgers.service';
import { EstatesService } from '../estates/estates.service';

@Controller('api/rents')
export class RentsController {

    constructor(private estateService: EstatesService, private ownerService: OwnersService, private lodgerService: LodgersService) { }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('pdf')
    getOwners(@Req() req) {
        return of(null);
    }

}