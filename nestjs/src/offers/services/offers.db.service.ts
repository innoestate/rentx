import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OfferDto } from "../models/offer.dto";
import { Offer_Entity } from "../models/offer.entity";
import { Repository } from "typeorm";

@Injectable()
export class OffersDbService {

    constructor(@InjectRepository(Offer_Entity)
    private offerRepository: Repository<Offer_Entity>) { }

    async create(createOfferDto: OfferDto) {
        try {
            const offer = this.offerRepository.create(createOfferDto);
            return this.offerRepository.save(offer);
        } catch (error) {
            console.log('error', error);
            throw error;
        }
    }

    async findAllByUser(userId: string) {
        return this.offerRepository.find({
            where: { user_id: userId }
        });
    }

    async findByProspectionId(prospectionId: string) {
        return this.offerRepository.find({
            where: { prospection_id: prospectionId }
        });
    }

    async findOne(id: string) {
        return this.offerRepository.findOne({
            where: { id }
        });
    }

    async update(id: string, updateOfferDto: Partial<OfferDto>) {
        const offer = await this.findOne(id);
        if (!offer) {
            throw new Error('Offer not found');
        }
        Object.assign(offer, updateOfferDto);
        return this.offerRepository.save(offer);
    }

    async delete(id: string) {
        const offer = await this.findOne(id);
        if (!offer) {
            throw new Error('Offer not found');
        }
        await this.offerRepository.remove(offer);
    }
}