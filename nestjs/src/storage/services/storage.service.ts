import { Injectable } from "@nestjs/common";
import { ProspectionsDbService } from "../../prospections/services/prospections.db.service";
import { synchronizeFoldersStorage } from "../storage.business";
import { FolderStorageGoogleDriveStrategy } from "../strategy/folder-storage.google_drive.strategy";

@Injectable()
export class StorageService {

    public folderStrategy;

    constructor(private prospectionsDbService: ProspectionsDbService) {

    }

    async synchronize(userId: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string) {

        this.folderStrategy = new FolderStorageGoogleDriveStrategy();
        if(accessToken && refreshToken && clientId && clientSecret){
            await this.folderStrategy.init(accessToken, refreshToken, clientId, clientSecret);
        }

        const prospections = await this.prospectionsDbService.findAll(userId);
        const createdProspections = await synchronizeFoldersStorage(prospections, this.folderStrategy);
        await Promise.all(Object.keys(createdProspections).map(async (prospectionId) => {
            await this.prospectionsDbService.update(prospectionId, { storage_folder_id: createdProspections[prospectionId] });
        }));
        return true;
    }

}