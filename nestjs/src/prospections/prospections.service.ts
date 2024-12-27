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
        return this.prospectionRepository.save(prospection);
    }

    async findAll(user_id: string) {
        return this.prospectionRepository.find({
            where: { user_id },
            relations: ['offers']
        });
    }

    async findOne(id: string) {
        const prospection = await this.prospectionRepository.findOne({
            where: { id },
            relations: ['offers']
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

    async updateMany(user_id: string, updateProspectionDto: any) {
        try{
            console.log('update many', user_id, updateProspectionDto);
            return this.prospectionRepository.update({ user_id }, updateProspectionDto);
        }catch(e){
            console.error(e);
            throw new NotFoundException(`Fail to update many Prospections of ${user_id} for ${updateProspectionDto}`);
        }
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
        try{
            const seller = await this.findOneSeller(id);
            if (!seller) {
                throw new NotFoundException(`Seller with ID "${id}" not found`);
            }
            return this.sellerRepository.remove(seller);
        }catch(e){
            console.error(e);
            throw new NotFoundException(`Fail to remove "${id}"`);
        }
    }

    async updateSeller(id: string, updateSellerDto: SellerDto) {
        try{
            const seller = await this.findOneSeller(id);
            if (!seller) {
                throw new NotFoundException(`Seller with ID "${id}" not found`);
            }
            Object.assign(seller, updateSellerDto);
            return this.sellerRepository.save(seller);
        }catch(e){
            console.error(e);
            throw new NotFoundException(`"Fail to update Seller with ID "${id}"`);
        }
    }

    async findAllSellers(user_id: string) {
        try {
            return this.sellerRepository.find({
                where: { user_id }
            });
        }catch(e){
            console.error(e);
            throw new NotFoundException(`Fail to find Sellers`);
        }

    }

    async findOneSeller(id: string) {
        try{
            const seller = await this.sellerRepository.findOne({
                where: { id },
            });
            return seller;
        }catch(e){
            throw new NotFoundException(`Seller with ID "${id}" not found`);
        }
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
