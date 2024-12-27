import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SellerDto } from './dto/create-seller.dto';
import { OfferDto } from './dto/offer.dto';
import { ProspectionDto } from './dto/prospection.dto';
import { ProspectionsService } from './prospections.service';

@Controller('prospections')
export class ProspectionsController {
    constructor(private readonly prospectionsService: ProspectionsService) {}

    @Post()
    create(@Body() createProspectionDto: ProspectionDto) {
        return this.prospectionsService.create(createProspectionDto);
    }

    @Get()
    findAll() {
        return this.prospectionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.prospectionsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProspectionDto: ProspectionDto) {
        return this.prospectionsService.update(id, updateProspectionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.prospectionsService.remove(id);
    }

    // Seller endpoints
    @Post('sellers')
    createSeller(@Body() createSellerDto: SellerDto) {
        return this.prospectionsService.createSeller(createSellerDto);
    }

    @Get('sellers')
    findAllSellers() {
        return this.prospectionsService.findAllSellers();
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
