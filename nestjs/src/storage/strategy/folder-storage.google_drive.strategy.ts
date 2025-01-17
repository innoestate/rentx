import { FileStorage } from "../models/file";
import { StorageFolder } from "../models/folder";
import { FolderStorageStrategy } from "./folder-storage.strategy";
import { google, drive_v3 } from 'googleapis';
import { Injectable } from '@nestjs/common';

export const getOath2Client = async (accessToken: string, refreshToken: string, clientId: string, clientSecret: string) => {
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });
    await refreshTokenFunction(oauth2Client);
    return oauth2Client;
}

const refreshTokenFunction = async (oauth2Client) => {
    console.log('refresh token');
    await oauth2Client.refreshAccessToken().then(tokens => {
        oauth2Client.setCredentials(tokens.credentials);
        return tokens.credentials.access_token;
    })
};



@Injectable()
export class FolderStorageGoogleDriveStrategy extends FolderStorageStrategy {
    private drive: drive_v3.Drive;

    constructor() {
        super();
        console.log('constructor google drive storage strategy');
    }

    async init(ccessToken: string, refreshToken: string, clientId: string, clientSecret: string) {
        const oauth2Client = await getOath2Client(ccessToken, refreshToken, clientId, clientSecret);
        this.drive = google.drive({
            version: 'v3',
            auth: oauth2Client
        });
    }


    async createFolder(path: string): Promise<string> {

        const folders_names = path.split('/');
        let lastParentId = null;
        let i = 0;
        while (i < folders_names.length) {

            try {

                const folderName = folders_names[i];
                let folderId;

                const folderExisting = await this.drive.files.list({
                    q: `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`,
                    fields: 'files(id)',
                });

                if (folderExisting.data.files.length > 0) {
                    folderId = folderExisting.data.files[0].id;
                    lastParentId = folderId;
                } else {
                    if (lastParentId) {
                        const newFolder = await this.drive.files.create({
                            requestBody: {
                                name: folderName,
                                mimeType: 'application/vnd.google-apps.folder',
                                parents: [lastParentId]
                            },
                            fields: 'id',
                        });
                        folderId = newFolder.data.id;
                    } else {
                        const newFolder = await this.drive.files.create({
                            requestBody: {
                                name: folderName,
                                mimeType: 'application/vnd.google-apps.folder',
                            },
                            fields: 'id',
                        });
                        folderId = newFolder.data.id;
                    }
                }
                lastParentId = folderId;
            } catch (e) {
                console.log('error', e);
            }
            i++;
        }

        return lastParentId;
    }

    async updateFolderPath(id: string, path: string) {
        console.log('updateFolderPath WIP not implemented yet');
        // const newName = path.split('/').pop();
        // await this.drive.files.update({
        //     fileId: id,
        //     requestBody: {
        //         name: newName,
        //     },
        // });
    }

    async addFile(folder_id: string, file: Buffer, fileName: string): Promise<string> {
        const fileMetadata = {
            name: fileName,
            parents: [folder_id],
        };

        const media = {
            mimeType: 'application/octet-stream',
            body: file,
        };

        const response = await this.drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id',
        });

        return response.data.id;
    }

    async getFolder(id: string): Promise<StorageFolder> {
        const response = await this.drive.files.get({
            fileId: id,
            fields: 'id, name, mimeType, createdTime',
        });
        return {
            id: response.data.id,
            path: response.data.name, // Note: Google Drive doesn't have a direct path concept
        };
    }

    async getFiles(folder_id: string): Promise<FileStorage[]> {
        const response = await this.drive.files.list({
            q: `'${folder_id}' in parents and mimeType != 'application/vnd.google-apps.folder'`,
            fields: 'files(id, name, mimeType, size, createdTime)',
        });

        return response.data.files.map(file => ({
            id: file.id,
            name: file.name,
            path: file.name, // Note: Google Drive doesn't have a direct path concept
            // size: parseInt(file.size) || 0,
            content: file,
            // mime_type: file.mimeType,
            // created_at: new Date(file.createdTime),
        }));
    }
}