import { ProspectionDb } from "src/prospections/dto/prospection.db";
import { FolderStorageStrategy } from "./strategy/folder-storage.strategy";
import { getProspectionFolderPath } from "./utils/storage.utils";

export const synchronizeFoldersStorage = async (prospections: ProspectionDb[], strategy: FolderStorageStrategy): Promise<{ [key: string]: string }> => {

    const createdFolders: { [key: string]: string } = {};
    console.log('synchronizeFoldersStorage');

    let i = 0;
    while(i < prospections.length){
        let createdId = await synchronizeProspection(prospections[i], strategy);
        if(createdId){
            createdFolders[prospections[i].id] = createdId;
        }
        i ++;
    }

    return createdFolders;

    //for each prospection:
    //check if there is a storage_folder_id
    //if not, create a folder for the prospection
    //update the prospection with the folder_id
    //if yes, check if the folder exists
    //if not, create a folder for the prospection
    //update the prospection with the folder_id
    //if yes, 
    //check the path and if it is correc
    //if not, update the path
    //if yes, do nothing

}

const synchronizeProspection = async (prospection: ProspectionDb, strategy: FolderStorageStrategy) => {

    if (!await updateExistingFolder(prospection, strategy)) {
        return createFolder(prospection, strategy);
    }
    return null;
}

const updateExistingFolder = async (prospection: ProspectionDb, strategy: FolderStorageStrategy): Promise<boolean> => {

    if(prospection.storage_folder_id === null){
        return false;
    }

    const path = getProspectionFolderPath(prospection);

    try{
        const folder = await strategy.getFolder(prospection.storage_folder_id);
        if (!folder) {
            return false
        } else if (folder.path !== path) {
            await strategy.updateFolderPath(prospection.storage_folder_id, path);
        }
    }catch(e){
        console.error(e);
        return false;
    }
    return true;
}

const createFolder = async (prospection: ProspectionDb, strategy: FolderStorageStrategy): Promise<string> => {
    const path = getProspectionFolderPath(prospection);
    console.log('createFolder', path);
    return await strategy.createFolder('prospections/' + path);
}