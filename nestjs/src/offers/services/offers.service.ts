import { Injectable } from "@nestjs/common";
import { OfferDto } from "../../offers/models/offer.dto";
import { ProspectionsDbService } from "../../prospections/services/prospections.db.service";
import { FolderStorageGoogleDriveStrategy } from "../../storage/strategy/folder-storage.google_drive.strategy";
import { getProspectionFolderPath } from "../../storage/utils/storage.utils";
import { OffersDbService } from "./offers.db.service";
import { ProspectionDb } from "src/prospections/dto/prospection.db";

@Injectable()
export class OffersService {
    
    constructor(
        private readonly OffersServiceDb: OffersDbService,
        private readonly prospectionsDbService: ProspectionsDbService,
    ) { }

    async addOffer(prospection_id: string, offer: OfferDto, file: any, accessToken: string, refreshToken: string, clientId: string, clientSecret: string,) {

        const prospection = await this.prospectionsDbService.findOne(prospection_id) as ProspectionDb;
        console.log('prospection', prospection);

        const storageStrategy = new FolderStorageGoogleDriveStrategy();
        await storageStrategy.init(accessToken, refreshToken, clientId, clientSecret);
        await storageStrategy.addFile(prospection.storage_folder_id, file, 'offre_' + getProspectionFolderPath(prospection) + '.pdf');

    }
}