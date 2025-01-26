import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { from, of, switchMap } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { SellerDto } from '../sellers/models/create-seller.dto';
import { ProspectionDto } from './dto/prospection.dto';
import { formatProspectionDtoForCreation } from './prospections.utils';
import { ProspectionsDbService } from './services/prospections.db.service';
import { ProspectionsService } from './services/prospections.service';
import { SellersDbService } from './services/sellers.db.service';

@Controller('api/prospections')
export class ProspectionsController {
    constructor(
        private readonly prospectionService: ProspectionsService,
        private readonly prospectionsDbService: ProspectionsDbService,
        private readonly sellersService: SellersDbService,
        private readonly configService: ConfigService
    ) { }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post()
    create(@Body() createProspectionDto: ProspectionDto, @Req() req) {
        const prospection = formatProspectionDtoForCreation(req.user?.id, createProspectionDto);
        return this.prospectionService.createNewProspection(prospection, req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'));
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get()
    findAll(@Req() req) {
        return this.prospectionService.findAll(req.user?.id);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get(':id')
    findOne(@Param('id') id: string, @Req() req) {
        return this.prospectionService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProspectionDto: Partial<ProspectionDto>, @Req() req) {
        return this.prospectionService.update(id, updateProspectionDto, req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'));
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req) {
        return this.prospectionService.remove(req.user?.id, id, req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'));
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post('sellers')
    createSeller(@Body() createSellerDto: SellerDto, @Req() req) {
        createSellerDto.user_id = req.user.id;
        return this.sellersService.createSeller(createSellerDto);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('sellers/all')
    findAllSellers(@Req() req) {
        return this.sellersService.findAllSellers(req.user?.id);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('sellers/:id')
    findOneSeller(@Param('id') id: string) {
        return this.sellersService.findOneSeller(id);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Patch('sellers/:id')
    updateSeller(@Param('id') id: string, @Body() updateSellerDto: SellerDto, @Req() req) {
        updateSellerDto.user_id = req.user.id;
        return this.sellersService.updateSeller(id, updateSellerDto);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Delete('sellers/:id')
    removeSeller(@Param('id') id: string, @Req() req, @Res() res) {
        return from(this.sellersService.removeSeller(id)).pipe(
            switchMap(_ => this.prospectionService.updateMany(req.user?.id, { seller_id: null })),
            switchMap(_ => of(res.send({ statusCode: 200, body: 'seller ' + id + ' removed' })))
        );
    }
}
