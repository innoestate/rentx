import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { Sheet, SpreadSheet } from "./rents.spreadsheet.buisness";


export class GoogleSheetWorker {

    fakeSpreadSheets: { [id: string]: SpreadSheet } = {};

    constructor() { }

    getSpreadSheet(id: string): SpreadSheet{
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

    addSheet(id: string, title: string): SpreadSheet {
        const newSheet = {
            sheetId: this.fakeSpreadSheets[id].sheets.length,
            title,
            rows: []
        }
        this.fakeSpreadSheets[id].sheets.push(newSheet);
        return this.fakeSpreadSheets[id];
    }

    addSheets(id: string, titles: string[]): SpreadSheet {
        titles.forEach(title => {
            this.addSheet(id, title);
        })
        return this.fakeSpreadSheets[id];
    }

    getSheets(id: string): Sheet[] {
        return this.fakeSpreadSheets[id]?.sheets ?? [];
    }

    createSheet(title: string, estates: Estate_filled_Db[]): Sheet{
        return null;
    }

    updateSheets(sheets: Sheet[]): void {
        return null;
    }

}