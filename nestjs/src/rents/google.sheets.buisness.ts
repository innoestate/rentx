import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { Sheet, SpreadSheet } from "./rents.spreadsheet.buisness";


export class GoogleSheetWorker {

    constructor() { }

    getSpreadSheet(id: string): Sheet {
        return null;
    }

    createSpreadSheet(title: string): SpreadSheet {
        return null;
    }

    addSheet(id: string, title: string): SpreadSheet {
        return null;
    }

    getSheets(): Sheet[] {
        return null;
    }

    createSheet(title: string, estates: Estate_filled_Db[]): Sheet{
        return null;
    }

    updateSheets(sheets: Sheet[]): void {
        return null;
    }

}