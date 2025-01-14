import { ProspectionDb } from "src/prospections/dto/prospection.db"

export const getProspectionFolderPath = (prospection: ProspectionDb): string => {
    if(prospection.address) {
        return `${prospection.address}`;
    }
    return `${prospection.city}_${prospection.price}`;
}