import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { GoogleSheetWorker } from "./google.sheets.buisness";

export interface Sheet {
    sheetId: number;
    title: string;
    rows: { backgroundColor: string, value: string | number }[];
}

export interface SpreadSheet {
    id: string;
    sheets: Sheet[];
    title: string;
}

export interface SpreadSheetUpdate {
    cell: string;
    backgroundColor: string;
    value: string | number;
}

/**
 * 
 */
export const buildSpreadsheetContext = (googleSheetWorker: GoogleSheetWorker, id: string, estates: Estate_filled_Db[], startDate: Date, endDate: Date): SpreadSheet => {

    let spreadSheet = googleSheetWorker.createSpreadSheet(id, 'biens_locatifs');
    const years = getYearsFromDates(startDate, endDate);
    spreadSheet = googleSheetWorker.addSheets(id, years);

    return spreadSheet;
}

export const composeSpreadSheetUpdates = (googleSheetWorker: GoogleSheetWorker, spreadSheetContext: SpreadSheet): SpreadSheetUpdate[] => {
    return null
}

export const applySpreadSheetUpdates = (googleSheetWorker: GoogleSheetWorker, spreadSheetUpdates: SpreadSheetUpdate[]) => {
    return null;
}

const getYearsFromDates = (startDate: Date, endDate: Date): string[] => {
    const years: string[] = [];
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    for (let i = startYear; i <= endYear; i++) {
        years.push(i.toString());
    }
    return years;
}