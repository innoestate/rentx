import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ProspectionDb } from "../../prospections/dto/prospection.db";
import { OfferDto } from "../models/offer.dto";
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

    async addOffer(user_id: string, prospection_id: string, offer: OfferDto, file: any, accessToken: string, refreshToken: string, clientId: string, clientSecret: string) {
        const prospection = await this.prospectionsDbService.findOne(prospection_id) as ProspectionDb;

        let storageStrategy;
        if(this.configService.get('NODE_ENV') === 'test') {
            storageStrategy = new FolderStorageMockedStrategy();
        } else {
            storageStrategy = new FolderStorageGoogleDriveStrategy();
            await storageStrategy.init(accessToken, refreshToken, clientId, clientSecret);
        }

        const google_drive_id = await storageStrategy.addFile(prospection.storage_folder_id, file, 'offre_' + getProspectionFolderPath(prospection) + '.pdf');
        return await this.OffersServiceDb.create({...offer, user_id, google_drive_id});
    }

    async updateOffer(id: string, offer: Partial<OfferDto>, file: any, accessToken: string, refreshToken: string, clientId: string, clientSecret: string) {
        const existingOffer = await this.OffersServiceDb.findOne(id);
        if (!existingOffer) {
            throw new Error('Offer not found');
        }

        const prospection = await this.prospectionsDbService.findOne(existingOffer.prospection_id) as ProspectionDb;

        // If there's a new file, handle Google Drive update
        if (file) {
            let storageStrategy;
            if(this.configService.get('NODE_ENV') === 'test') {
                storageStrategy = new FolderStorageMockedStrategy();
            } else {
                storageStrategy = new FolderStorageGoogleDriveStrategy();
                await storageStrategy.init(accessToken, refreshToken, clientId, clientSecret);
            }

            // Delete old file if it exists
            if (existingOffer.google_drive_id) {
                await this.deleteOfferFile(existingOffer.google_drive_id, accessToken, refreshToken, clientId, clientSecret);
            }

            // Upload new file
            const google_drive_id = await storageStrategy.addFile(
                prospection.storage_folder_id,
                file,
                'offre_' + getProspectionFolderPath(prospection) + '.pdf'
            );
            offer.google_drive_id = google_drive_id;
        }

        return await this.OffersServiceDb.update(id, offer);
    }

    async deleteOfferFile(google_drive_id: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string) {
        if (this.configService.get('NODE_ENV') === 'test') {
            return;
        }

        // const storageStrategy = new FolderStorageGoogleDriveStrategy();
        // await storageStrategy.init(accessToken, refreshToken, clientId, clientSecret);
        // await storageStrategy.deleteFile(google_drive_id);
    }
}