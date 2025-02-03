import { ProspectionDb } from "../prospections/dto/prospection.db";
import { FolderStorageStrategy } from "../storage/strategy/folder-storage.strategy";

export const addOffer = async (propsection: ProspectionDb, offer: any, file: any, storageStrategy: FolderStorageStrategy) => {

    storageStrategy.addFile(propsection.storage_folder_id, file, 'offre_test.pdf');

}