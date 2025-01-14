import { FileStorage } from "../models/file";
import { StorageFolder } from "../models/folder";

export class FolderStorageStrategy {


    init(){}

    createFolder(path: string): string{
        throw new Error('Method not implemented.');
    }

    updateFolderPath(id: string, path: string){}

    addFile(folder_id: string, file: any, fileName: string): string{
        throw new Error('Method not implemented.');
    }

    getFolder(id: string): StorageFolder{
        throw new Error('Method not implemented.');
    }

    getFiles(folder_id: string): FileStorage[]{
        throw new Error('Method not implemented.');
    }


}