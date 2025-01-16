import { FileStorage } from '../models/file';
import { StorageFolder } from '../models/folder';
import { FolderStorageStrategy } from './folder-storage.strategy';

export class FolderStorageMockedStrategy extends FolderStorageStrategy {

    private folders: Map<string, StorageFolder> = new Map();
    private files: Map<string, FileStorage[]> = new Map();

    constructor() {
        super();
        console.log('constructor mocked storage strategy');
    }

    async createFolder(path: string): Promise<string> {
        console.log('create folder from mocked strategy')
        const id = Date.now().toString();
        this.folders.set(id, { id, path });
        return Promise.resolve(id);
    }

    updateFolderPath(id: string, path: string): void {
        const folder = this.folders.get(id);
        if (folder) {
            folder.path = path;
        }
    }

    async addFile(folder_id: string, file: any, fileName: string): Promise<string> {
        const folder = await this.getFolder(folder_id);
        const id = Date.now().toString();
        const fileStorage: FileStorage = { id, name: fileName, path: folder?.path + '/' + fileName, content: file };
        if (!this.files.has(folder_id)) {
            this.files.set(folder_id, []);
        }
        this.files.get(folder_id)?.push(fileStorage);
        return Promise.resolve(id);
    }

    async getFolder(id: string): Promise<StorageFolder | null> {
        return this.folders.get(id) || null;
    }

    async getFiles(folder_id: string): Promise<FileStorage[]> {
        return Promise.resolve(this.files.get(folder_id) || []);
    }
}