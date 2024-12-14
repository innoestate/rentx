import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { Sheet, SpreadSheet } from "./rents.spreadsheet.buisness";

export class SpreadSheetStrategy {
    
    getSpreadSheet(id: string): SpreadSheet {
        return null;
    }

    createSpreadSheet(id: string, title: string): SpreadSheet {
        return null;
    }

    addSheet(id: string, title: string, estates: Estate_filled_Db[]): SpreadSheet {
        return null;
    }

    addSheets(id: string, titles: string[], estates: Estate_filled_Db[]): SpreadSheet {
        return null;
    }

    addRowsInSheet(id: string, titles: string, estates: Estate_filled_Db[]): SpreadSheet {
        return null;
    }

    removeRowsInSheet(id: string, title: string, rowIdentifier: {street: string | number, city: string | number}[]): SpreadSheet {
        return null;
    }

    getSheets(id: string): Sheet[] {
        return null;
    }

    updateSheets(sheets: Sheet[]): SpreadSheet {
        return null;
    }
}