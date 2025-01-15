import { Injectable } from "@nestjs/common";
import { StorageService } from "../services/storage.service";
import { FolderStorageMockedStrategy } from "../strategy/folder-storage.mock.strategy";

@Injectable()
export class StorageMockedService extends StorageService{

    public override folderStrategy = new FolderStorageMockedStrategy()

}