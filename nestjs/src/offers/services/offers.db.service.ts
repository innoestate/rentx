import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OfferDto } from "../../offers/models/offer.dto";
import { Offer_Entity } from "../../offers/models/offer.entity";
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
        }
    }

    async findAllByUser(userId: string) {
        return this.offerRepository.find({
            where: { user_id: userId }
        });
    }

}