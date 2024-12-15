import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { Sheet, SpreadSheet } from "./rents.spreadsheet.buisness";
import { SpreadSheetStrategy } from "./spreadsheets.strategy";

const ROW_HEADER_VALUES = ['Propriétaire', 'Adresse', 'Ville', 'Lot', 'Locataire', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

export class MockedGoogleSpreadSheetStrategy extends SpreadSheetStrategy {    

    fakeSpreadSheets: { [id: string]: SpreadSheet } = {};

    constructor() { 
        super();
    }

    async getSpreadSheet(id: string): Promise<SpreadSheet> {
        return this.fakeSpreadSheets[id];
    }

    async createSpreadSheet( title: string): Promise<SpreadSheet> {
        this.fakeSpreadSheets['fakeId'] = {
            id: 'fakeId',
            title,
            sheets: []
        }
        return this.fakeSpreadSheets['fakeId'];
    }

    async addSheet(id: string, title: string, estates: Estate_filled_Db[]): Promise<SpreadSheet> {
        const newSheet = {
            sheetId: this.fakeSpreadSheets[id].sheets.length,
            title,
            rows: [
                ROW_HEADER_VALUES.map(value => ({ value })),
                ...estates.map(estate => [
                    { value: estate.owner.name },
                    { value: estate.owner.street },
                    { value: estate.owner.city },
                    { value: estate.lodger.name }])
            ]
        }
        this.fakeSpreadSheets[id].sheets.push(newSheet);
        return this.fakeSpreadSheets[id];
    }

    async addSheets(id: string, titles: string[], estates: Estate_filled_Db[]): Promise<SpreadSheet> {
        titles.forEach(title => {
            this.addSheet(id, title, estates);
        })
        return this.fakeSpreadSheets[id];
    }

    async addRowsInSheet(id: string, title: string, estates: Estate_filled_Db[]): Promise<SpreadSheet> {
        const rows = this.fakeSpreadSheets[id].sheets.find(sheet => sheet.title === title)?.rows;
        if (rows) {
            rows.push(
                ...estates.map(estate => [
                    { value: estate.owner.name },
                    { value: estate.street },
                    { value: estate.city },
                    { value: estate.lodger.name }])
            )
        }
        this.fakeSpreadSheets[id].sheets.find(sheet => sheet.title === title).rows = rows;
        return this.fakeSpreadSheets[id];
    }

    async removeRowsInSheet(id: string, title: string, rowIdentifier: {street: string | number, city: string | number}[]): Promise<SpreadSheet> {
        const rows = this.fakeSpreadSheets[id].sheets.find(sheet => sheet.title === title)?.rows;
        if (rows) {
            this.fakeSpreadSheets[id].sheets.find(sheet => sheet.title === title).rows = rows.filter(row => {
                return !rowIdentifier.find(identifier => identifier.street === row[1].value && identifier.city === row[2].value);
            });
        }
        return this.fakeSpreadSheets[id];
    }

    async getSheets(id: string): Promise<Sheet[]> {
        return this.fakeSpreadSheets[id]?.sheets ?? [];
    }

    // async updateSheets(sheets: Sheet[]): Promise<SpreadSheet> {
    //     return null;
    // }

}