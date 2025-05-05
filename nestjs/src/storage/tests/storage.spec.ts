import { ProspectionsStorageService } from '../services/storage.service';
import { synchronizeFoldersStorage } from "../storage.business";
import { FolderStorageMockedStrategy } from "../strategy/folder-storage.mock.strategy";
import { getProspectionFolderPath } from "../utils/storage.utils";
import { prospections1_Without_Adress, prospections2_With_Adress } from "./storage.mocks";

let storageService: ProspectionsStorageService;

describe('testing storage folders', () => {

    const strategy = new FolderStorageMockedStrategy();

    it('should not create a folder', async () => {

        const strategyWithOneFolder = new FolderStorageMockedStrategy();
        const folder_id = await strategyWithOneFolder.createFolder('fake_path');
        const createdFolders = await synchronizeFoldersStorage([{...prospections1_Without_Adress, storage_folder_id: folder_id}], strategyWithOneFolder);
        expect((createdFolders[prospections1_Without_Adress.id])).toBeFalsy(); 

    })

    it('should create a folder', async () => {

        const createdFolders = await synchronizeFoldersStorage([prospections1_Without_Adress], strategy);
        expect((createdFolders[prospections1_Without_Adress.id])).toBeTruthy(); 

    })

    it('should got the same path folder', async () => {

        const strategyWithOneFolder = new FolderStorageMockedStrategy();
        const folder_id = await strategyWithOneFolder.createFolder(getProspectionFolderPath(prospections1_Without_Adress));
        const prospection = {...prospections1_Without_Adress, storage_folder_id: folder_id};
        await synchronizeFoldersStorage([prospection], strategyWithOneFolder);
        const folderCreated = await strategyWithOneFolder.getFolder(folder_id);
        expect((folderCreated?.path)).toEqual(getProspectionFolderPath(prospection));

    }) 

    it('should update the path folder', async () => {

        const strategyWithOneFolder = new FolderStorageMockedStrategy();
        const oldPath = getProspectionFolderPath(prospections1_Without_Adress);
        const folder_id = await strategyWithOneFolder.createFolder(oldPath);
        const prospection = {...prospections1_Without_Adress, storage_folder_id: folder_id, address: '123 rue du test 12345 ville-forte'};
        const newPath = getProspectionFolderPath(prospection);
        await synchronizeFoldersStorage([prospection], strategyWithOneFolder);
        const folderCreated = await strategyWithOneFolder.getFolder(folder_id);
        expect(newPath).not.toEqual(oldPath);
        expect((folderCreated?.path)).toEqual(newPath);

    }) 

    it('should create 2 folders', async () => {

        const newStrategy = new FolderStorageMockedStrategy();
        const createdFolders = await synchronizeFoldersStorage([prospections1_Without_Adress, prospections2_With_Adress], newStrategy);
        expect((createdFolders[prospections1_Without_Adress.id])).toBeTruthy();
        expect((createdFolders[prospections2_With_Adress.id])).toBeTruthy();

    })

    it('should create 2 folder from 2 prospections', async () => {

        const newStrategy = new FolderStorageMockedStrategy();
        const folder_id = await newStrategy.createFolder(getProspectionFolderPath(prospections1_Without_Adress));
        const createdFolders = await synchronizeFoldersStorage([{...prospections1_Without_Adress, storage_folder_id: folder_id}, prospections2_With_Adress], newStrategy);
        expect((createdFolders[prospections1_Without_Adress.id])).toBeFalsy();
        expect((createdFolders[prospections2_With_Adress.id])).toBeTruthy();

    })

})