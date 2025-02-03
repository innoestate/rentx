import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ProspectionDb } from "src/prospections/dto/prospection.db";
import { OfferDto } from "../../offers/models/offer.dto";
import { ProspectionsDbService } from "../../prospections/services/prospections.db.service";
import { FolderStorageGoogleDriveStrategy } from "../../storage/strategy/folder-storage.google_drive.strategy";
import { FolderStorageMockedStrategy } from "../../storage/strategy/folder-storage.mock.strategy";
import { getProspectionFolderPath } from "../../storage/utils/storage.utils";
import { OffersDbService } from "./offers.db.service";

@Injectable()
export class OffersService {
    
    constructor(
        private readonly OffersServiceDb: OffersDbService,
        private readonly prospectionsDbService: ProspectionsDbService,
        private readonly configService: ConfigService
    ) { }

    async addOffer(user_id: string,prospection_id: string, offer: OfferDto, file: any, accessToken: string, refreshToken: string, clientId: string, clientSecret: string,) {

        const prospection = await this.prospectionsDbService.findOne(prospection_id) as ProspectionDb;

        let storageStrategy;
        if(this.configService.get('NODE_ENV') === 'test') {
            storageStrategy = new FolderStorageMockedStrategy();
        }else{
            storageStrategy = new FolderStorageGoogleDriveStrategy();
            await storageStrategy.init(accessToken, refreshToken, clientId, clientSecret);
        }

        const google_drive_id = await storageStrategy.addFile(prospection.storage_folder_id, file, 'offre_' + getProspectionFolderPath(prospection) + '.pdf');
        return await this.OffersServiceDb.create({...offer, user_id, google_drive_id});
    }
}