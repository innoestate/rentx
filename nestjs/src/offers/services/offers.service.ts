import { Injectable } from "@nestjs/common";
import { OffersDbService } from "./offers.db.service";
import { ProspectionDb } from "src/prospections/dto/prospection.db";
import { OfferDto } from "src/offers/models/offer.dto";
import { addOffer } from "../offers.business";
import { FolderStorageGoogleDriveStrategy } from "src/storage/strategy/folder-storage.google_drive.strategy";

@Injectable()
export class OffersService {
    
    constructor(
        private readonly OffersServiceDb: OffersDbService
    ) { }

    async addOffer(prospection: ProspectionDb, offer: {price: number}, file: any) {

    }
}