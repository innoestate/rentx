import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { of } from 'rxjs';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('api')
export class EstatesController {

    constructor() { }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('estates')
    getEstates(@Req() req) {
        console.log('getEstates', req.user);
        return of([      {
            id: '1',
            street: 'Address 1',
            zip: 'Zip 1',
            city: 'City 1'
          }]);
    }
}