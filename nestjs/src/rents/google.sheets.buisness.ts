import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { Sheet, SpreadSheet } from "./rents.spreadsheet.buisness";

const ROW_HEADER_VALUES = ['Propriétaire', 'Adresse', 'Ville', 'Lot', 'Locataire', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

export class GoogleSheetWorker {

    fakeSpreadSheets: { [id: string]: SpreadSheet } = {};

    constructor() { }

    getSpreadSheet(id: string): SpreadSheet {
        return this.fakeSpreadSheets[id];
    }

    createSpreadSheet(id: string, title: string): SpreadSheet {
        this.fakeSpreadSheets[id] = {
            id,
            title,
            sheets: []
        }
        return null;
    }

    addSheet(id: string, title: string, estates: Estate_filled_Db[]): SpreadSheet {
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

    addSheets(id: string, titles: string[], estates: Estate_filled_Db[]): SpreadSheet {
        titles.forEach(title => {
            this.addSheet(id, title, estates);
        })
        return this.fakeSpreadSheets[id];
    }

    getSheets(id: string): Sheet[] {
        return this.fakeSpreadSheets[id]?.sheets ?? [];
    }

    updateSheets(sheets: Sheet[]): void {
        return null;
    }

}