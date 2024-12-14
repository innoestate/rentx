import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { Sheet, SpreadSheet } from "./rents.spreadsheet.buisness";
import { SpreadSheetStrategy } from "./spreadsheets.strategy";

export class SpreadSheetGoogleStrategy extends SpreadSheetStrategy {
    
    constructor(ccessToken: string, refreshToken: string, clientId: string, clientSecret: string){
        super();
    }
    
    async getSpreadSheet(id: string): Promise<SpreadSheet> {
        return null;
    }

    async createSpreadSheet(id: string, title: string): Promise<SpreadSheet> {
        return null;
    }

    async addSheet(id: string, title: string, estates: Estate_filled_Db[]): Promise<SpreadSheet> {
        return null;
    }

    async addSheets(id: string, titles: string[], estates: Estate_filled_Db[]): Promise<SpreadSheet> {
        return null;
    }

    async addRowsInSheet(id: string, titles: string, estates: Estate_filled_Db[]): Promise<SpreadSheet> {
        return null;
    }

    async removeRowsInSheet(id: string, title: string, rowIdentifier: {street: string | number, city: string | number}[]): Promise<SpreadSheet> {
        return null;
    }

    async getSheets(id: string): Promise<Sheet[]> {
        return null;
    }

    async updateSheets(sheets: Sheet[]): Promise<SpreadSheet> {
        return null;
    }
}