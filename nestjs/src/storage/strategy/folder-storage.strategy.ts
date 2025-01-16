import { FileStorage } from "../models/file";
import { StorageFolder } from "../models/folder";

export class FolderStorageStrategy {

    constructor(){}

    createFolder(path: string): Promise<string>{
        throw new Error('Method not implemented.');
    }

    updateFolderPath(id: string, path: string){}

    addFile(folder_id: string, file: any, fileName: string): Promise<string>{
        throw new Error('Method not implemented.');
    }

    getFolder(id: string): Promise<StorageFolder | null>{
        throw new Error('Method not implemented.');
    }

    getFiles(folder_id: string): Promise<FileStorage[]>{
        throw new Error('Method not implemented.');
    }


}