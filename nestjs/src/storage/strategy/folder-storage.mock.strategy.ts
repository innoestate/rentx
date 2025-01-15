import { FileStorage } from '../models/file';
import { StorageFolder } from '../models/folder';
import { FolderStorageStrategy } from './folder-storage.strategy';

export class FolderStorageMockedStrategy extends FolderStorageStrategy {
    private folders: Map<string, StorageFolder> = new Map();
    private files: Map<string, FileStorage[]> = new Map();

    init(){}

    createFolder(path: string): string {
        const id = Date.now().toString();
        this.folders.set(id, { id, path });
        return id;
    }

    updateFolderPath(id: string, path: string): void {
        const folder = this.folders.get(id);
        if (folder) {
            folder.path = path;
        }
    }

    addFile(folder_id: string, file: any, fileName: string): string {
        const folder = this.getFolder(folder_id);
        const id = Date.now().toString();
        const fileStorage: FileStorage = { id, name: fileName, path: folder?.path + '/' + fileName, content: file };
        if (!this.files.has(folder_id)) {
            this.files.set(folder_id, []);
        }
        this.files.get(folder_id)?.push(fileStorage);
        return id;
    }

    getFolder(id: string): StorageFolder | null {
        return this.folders.get(id) || null;
    }

    getFiles(folder_id: string): FileStorage[] {
        return this.files.get(folder_id) || [];
    }
}