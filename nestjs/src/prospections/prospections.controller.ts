import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { from, of, switchMap } from 'rxjs';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { SellerDto } from './dto/create-seller.dto';
import { OfferDto } from './dto/offer.dto';
import { ProspectionDto } from './dto/prospection.dto';
import { ProspectionsDbService } from './services/prospections.db.service';
import { SellersDbService } from './services/sellers.db.service';

@Controller('api/prospections')
export class ProspectionsController {
    constructor(
        private readonly prospectionsService: ProspectionsDbService,
        private readonly sellersService: SellersDbService,
    ) { }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post()
    create(@Body() createProspectionDto: ProspectionDto, @Req() req) {
        return this.prospectionsService.create(this.formatProspectionDto(req.user?.id,createProspectionDto));
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get()
    findAll(@Req() req) {
        return this.prospectionsService.findAll(req.user?.id);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get(':id')
    findOne(@Param('id') id: string, @Req() req) {
        return this.prospectionsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProspectionDto: ProspectionDto, @Req() req) {
        updateProspectionDto.user_id = req.user.id;
        return this.prospectionsService.update(id, updateProspectionDto);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req) {
        return this.prospectionsService.remove(id);
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
        console.log('findAllSellers', req.user?.id);
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
            switchMap(_ => this.prospectionsService.updateMany(req.user?.id, { seller_id: null })),
            switchMap(_ => of(res.send({ statusCode: 200, body: 'seller ' + id + ' removed' })))
        );
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post('offers')
    createOffer(@Body() createOfferDto: OfferDto) {
        return this.prospectionsService.createOffer(createOfferDto);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('offers')
    findAllOffers() {
        return this.prospectionsService.findAllOffers();
    }


    private formatProspectionDto(userId: string,createProspectionDto: ProspectionDto) {
        const createProspectionDtoKeys = Object.keys(createProspectionDto);
        createProspectionDto.user_id = userId;
        if(!createProspectionDto.emission_date) {
            createProspectionDto.emission_date = new Date();    
        }
        if(!createProspectionDto.price) {
            createProspectionDto.price = 0;
        }
        return {...createProspectionDtoKeys, ...createProspectionDto};
    }
}
