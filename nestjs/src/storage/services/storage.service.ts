import { Injectable } from "@nestjs/common";
import { ProspectionsDbService } from "../../prospections/services/prospections.db.service";
import { synchronizeFoldersStorage } from "../storage.business";
import { FolderStorageMockedStrategy } from "../strategy/folder-storage.mock.strategy";
import { FolderStorageGoogleDriveStrategy } from "../strategy/folder-storage.google_drive.strategy";

@Injectable()
export class StorageService {

    public folderStrategy = new FolderStorageGoogleDriveStrategy();

    constructor(private prospectionsDbService: ProspectionsDbService) { 
    }

    async synchronize(userId: string) {

        console.log('storage synchronization called', userId);

        const prospections = await this.prospectionsDbService.findAll(userId);
        const createdProspections = await synchronizeFoldersStorage(prospections, this.folderStrategy);
        console.log('createdProspections', createdProspections);
        await Promise.all(Object.keys(createdProspections).map(async (prospectionId) => {
            await this.prospectionsDbService.update(prospectionId, { storage_folder_id: createdProspections[prospectionId] });
        }));
        return true;
    }

}