import { Injectable } from "@nestjs/common";
import { ProspectionsStorageService } from "../services/storage.service";
import { FolderStorageMockedStrategy } from "../strategy/folder-storage.mock.strategy";

@Injectable()
export class StorageMockedService extends ProspectionsStorageService{

    public override folderStrategy = new FolderStorageMockedStrategy()

}