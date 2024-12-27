import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
import { SellerDto } from './dto/create-seller.dto';
import { OfferDto } from './dto/offer.dto';
import { ProspectionDto } from './dto/prospection.dto';
import { ProspectionsService } from './prospections.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserMidleweare } from '../guards/user-midleweare.guard';

@Controller('prospections')
export class ProspectionsController {
    constructor(private readonly prospectionsService: ProspectionsService) {}

    @UseGuards(JwtAuthGuard, UserMidleweare)
    @Post()
    create(@Body() createProspectionDto: ProspectionDto, @Req() req) {
        console.log('createProspectionDto user', req.user);
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

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req) {
        return this.prospectionsService.remove(id);
    }

    // Seller endpoints
    @Post('sellers')
    createSeller(@Body() createSellerDto: SellerDto) {
        return this.prospectionsService.createSeller(createSellerDto);
    }

    @Get('sellers')
    findAllSellers(user_id: string) {
        return this.prospectionsService.findAllSellers(user_id);
    }

    @Get('sellers/:id')
    findOneSeller(@Param('id') id: string) {
        return this.prospectionsService.findOneSeller(id);
    }

    @Patch('sellers/:id')
    updateSeller(@Param('id') id: string, @Body() updateSellerDto: SellerDto) {
        return this.prospectionsService.updateSeller(id, updateSellerDto);
    }

    @Delete('sellers/:id')
    removeSeller(@Param('id') id: string) {
        return this.prospectionsService.removeSeller(id);
    }

    // Offer endpoints
    @Post('offers')
    createOffer(@Body() createOfferDto: OfferDto) {
        return this.prospectionsService.createOffer(createOfferDto);
    }

    @Get('offers')
    findAllOffers() {
        return this.prospectionsService.findAllOffers();
    }
}
