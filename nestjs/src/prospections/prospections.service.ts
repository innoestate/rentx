import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerDto } from './dto/create-seller.dto';
import { OfferDto } from './dto/offer.dto';
import { ProspectionDto } from './dto/prospection.dto';
import { Offer_Entity } from './entities/offer.entity';
import { Prospection_Entity } from './entities/prospection.entity';
import { Seller_Entity } from './entities/seller.entity';

@Injectable()
export class ProspectionsService {
    constructor(
        @InjectRepository(Prospection_Entity)
        private prospectionRepository: Repository<Prospection_Entity>,
        @InjectRepository(Seller_Entity)
        private sellerRepository: Repository<Seller_Entity>,
        @InjectRepository(Offer_Entity)
        private offerRepository: Repository<Offer_Entity>,
    ) {}

    async create(createProspectionDto: ProspectionDto) {
        const prospection = this.prospectionRepository.create(createProspectionDto);
        
        // if (createProspectionDto.seller_id) {
        //     const sellers = await this.sellerRepository.findByIds(createProspectionDto.seller_ids);
        //     prospection.sellers = sellers;
        // }

        return this.prospectionRepository.save(prospection);
    }

    async findAll(user_id: string) {
        return this.prospectionRepository.find({
            where: { user_id },
            relations: ['sellers', 'offers']
        });
    }

    async findOne(id: string) {
        const prospection = await this.prospectionRepository.findOne({
            where: { id },
            relations: ['sellers', 'offers']
        });

        if (!prospection) {
            throw new NotFoundException(`Prospection with ID "${id}" not found`);
        }

        return prospection;
    }

    async update(id: string, updateProspectionDto: ProspectionDto) {
        const prospection = await this.findOne(id);
        Object.assign(prospection, updateProspectionDto);
        return this.prospectionRepository.save(prospection);
    }

    async remove(id: string) {
        const prospection = await this.findOne(id);
        return this.prospectionRepository.remove(prospection);
    }

    // Seller methods
    async createSeller(createSellerDto: SellerDto) {
        const seller = this.sellerRepository.create(createSellerDto);
        return this.sellerRepository.save(seller);
    }

    async removeSeller(id: string) {
        const seller = await this.findOneSeller(id);
        return this.sellerRepository.remove(seller);
    }

    async updateSeller(id: string, updateSellerDto: SellerDto) {
        const seller = await this.findOneSeller(id);
        Object.assign(seller, updateSellerDto);
        return this.sellerRepository.save(seller);
    }

    async findAllSellers(user_id: string) {
        return this.sellerRepository.find({
            where: { user_id },
            relations: ['prospections']
        });
    }

    async findOneSeller(id: string) {
        return this.sellerRepository.findOne({
            where: { id },
            relations: ['prospections']
        });
    }

    // Offer methods
    async createOffer(createOfferDto: OfferDto) {
        const offer = this.offerRepository.create(createOfferDto);
        return this.offerRepository.save(offer);
    }

    async findAllOffers() {
        return this.offerRepository.find({
            relations: ['prospection']
        });
    }
}
