import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferDto } from '../dto/offer.dto';
import { ProspectionDto } from '../dto/prospection.dto';
import { Offer_Entity } from '../entities/offer.entity';
import { Prospection_Entity } from '../entities/prospection.entity';
import { SellersDbService } from '../services/sellers.db.service';
import { ProspectionDb } from '../dto/prospection.db';

@Injectable()
export class ProspectionsDbService {
    constructor(
        @InjectRepository(Prospection_Entity)
        private prospectionRepository: Repository<Prospection_Entity>,
        @InjectRepository(Offer_Entity)
        private offerRepository: Repository<Offer_Entity>,
    ) {}

    async create(createProspectionDto: ProspectionDto) {
        const prospection = this.prospectionRepository.create(createProspectionDto);
        return this.prospectionRepository.save(prospection);
    }

    async findAll(user_id: string): Promise<ProspectionDb[]> {
        return this.prospectionRepository.find({
            where: { user_id },
            relations: ['offers']
        }) as Promise<ProspectionDb[]>;
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

    async update(id: string, updateProspectionDto: Partial<ProspectionDto>) {
        return this.prospectionRepository.update(id, updateProspectionDto);
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
