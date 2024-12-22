import { Estate_filled_Db } from "../../../estates/estate-filled-db.model";
import { Sheet, SpreadSheet } from "../models/spreadsheets.model";

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

    async addRowsInSheets(id: string, missings: {sheetTitle: string, missingEstates: Estate_filled_Db[] }[] ): Promise<SpreadSheet> {
        return null;
    }

    async removeRowsInSheets(id: string, rowIdentifier: {street: string | number, city: string | number, plot?: string}[] ): Promise<SpreadSheet> {
        return null;
    }

    async getSheets(id: string): Promise<Sheet[]> {
        return null;
    }

    // async updateSheets(sheets: Sheet[]): Promise<SpreadSheet> {
    //     return null;
    // }
}