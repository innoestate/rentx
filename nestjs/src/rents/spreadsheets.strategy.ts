import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { Sheet, SpreadSheet } from "./rents.spreadsheet.buisness";

export class SpreadSheetStrategy {
    
    async getSpreadSheet(id: string): Promise<SpreadSheet> {
        return null;
    }

    async createSpreadSheet( title: string): Promise<SpreadSheet> {
        return null;
    }

    async addSheet(id: string, title: string, estates: Estate_filled_Db[]): Promise<SpreadSheet> {
        return null;
    }

    async addSheets(id: string, titles: string[], estates: Estate_filled_Db[]): Promise<SpreadSheet> {
        return null;
    }

    async addRowsInSheet(id: string, title: string, estates: Estate_filled_Db[]): Promise<SpreadSheet> {
        return null;
    }

    async removeRowsInSheet(id: string, title: string, rowIdentifier: {street: string | number, city: string | number}[]): Promise<SpreadSheet> {
        return null;
    }

    async getSheets(id: string): Promise<Sheet[]> {
        return null;
    }

    // async updateSheets(sheets: Sheet[]): Promise<SpreadSheet> {
    //     return null;
    // }
}