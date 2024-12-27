import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { SellerDto } from './dto/create-seller.dto';
import { OfferDto } from './dto/offer.dto';
import { ProspectionDto } from './dto/prospection.dto';
import { ProspectionsService } from './prospections.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';
import { from, of, switchMap, tap } from 'rxjs';

@Controller('prospections')
export class ProspectionsController {
    constructor(private readonly prospectionsService: ProspectionsService) { }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post()
    create(@Body() createProspectionDto: ProspectionDto, @Req() req) {
        createProspectionDto.user_id = req.user?.id;
        return this.prospectionsService.create(createProspectionDto);
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
        return this.prospectionsService.createSeller(createSellerDto);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('sellers/all')
    findAllSellers(@Req() req) {
        console.log('findAllSellers', req.user?.id);
        return this.prospectionsService.findAllSellers(req.user?.id);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Get('sellers/:id')
    findOneSeller(@Param('id') id: string) {
        return this.prospectionsService.findOneSeller(id);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Patch('sellers/:id')
    updateSeller(@Param('id') id: string, @Body() updateSellerDto: SellerDto, @Req() req) {
        updateSellerDto.user_id = req.user.id;
        return this.prospectionsService.updateSeller(id, updateSellerDto);
    }

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Delete('sellers/:id')
    removeSeller(@Param('id') id: string, @Req() req, @Res() res) {
        return from(this.prospectionsService.removeSeller(id)).pipe(
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
}
