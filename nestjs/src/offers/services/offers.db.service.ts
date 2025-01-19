import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OfferDto } from "src/offers/models/offer.dto";
import { Offer_Entity } from "src/offers/models/offer.entity";
import { Repository } from "typeorm";

@Injectable()
export class OffersDbService {

    constructor(@InjectRepository(Offer_Entity)
    private offerRepository: Repository<Offer_Entity>) { }

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