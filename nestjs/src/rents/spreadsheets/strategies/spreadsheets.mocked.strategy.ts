import { Estate_filled_Db } from "../../../estates/estate-filled-db.model";
import { Sheet, SpreadSheet } from "../models/spreadsheets.model";
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

    async createSpreadSheet(title: string): Promise<SpreadSheet> {
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
                    { value: estate.street },
                    { value: estate.city },
                    { value: estate.plot },
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

    async addRowsInSheets(id: string, missings: { sheetTitle: string, missingEstates: Estate_filled_Db[] }[]): Promise<SpreadSheet> {
        missings.forEach(missing => {
            const rows = this.fakeSpreadSheets[id].sheets.find(sheet => sheet.title === missing.sheetTitle)?.rows;
            if (rows) {
                rows.push(
                    ...missing.missingEstates.map(estate => [
                        { value: estate.owner.name },
                        { value: estate.street },
                        { value: estate.city },
                        { value: estate.plot },
                        { value: estate.lodger.name}])
                )
            }
            this.fakeSpreadSheets[id].sheets.find(sheet => sheet.title === missing.sheetTitle).rows = rows;
        })
        return this.fakeSpreadSheets[id];
    }

    async removeRowsInSheets(id: string, rowIdentifier: { street: string | number, city: string | number, plot?: string }[]): Promise<SpreadSheet> {
        rowIdentifier.forEach(identifier => {
            for (let i = 0; i < this.fakeSpreadSheets[id].sheets.length; i++) {
                this.fakeSpreadSheets[id].sheets[i].rows = this.fakeSpreadSheets[id].sheets[i].rows.filter(rows => {
                    if( rows[1].value === identifier.street && rows[2].value === identifier.city && rows[3].value === identifier.plot ){
                        return false;
                    }
                    return true;
                })
            }

        });
        return this.fakeSpreadSheets[id];
    }

    async getSheets(id: string): Promise<Sheet[]> {
        return this.fakeSpreadSheets[id]?.sheets ?? [];
    }

    // async updateSheets(sheets: Sheet[]): Promise<SpreadSheet> {
    //     return null;
    // }

}