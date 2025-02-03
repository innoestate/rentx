import { ProspectionDb } from "src/prospections/dto/prospection.db";

export const prospections1_Without_Adress =
    {
        id: '1234',
        user_id: 'ABCD',
        city: 'ville-forte',
        price: 100000,
        storage_folder_id: '1',
    } as ProspectionDb;


export const prospections2_With_Adress =
    {
        id: '2345',
        user_id: 'ABCD',
        address: '123 rue du test 12345',
        city: 'ville-forte',
        price: 110000,
        storage_folder_id: '2',
    } as ProspectionDb;
