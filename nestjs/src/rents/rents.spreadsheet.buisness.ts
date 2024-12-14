import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { GoogleSheetWorker } from "./google.sheets.buisness";

export interface Sheet {
    sheetId: number;
    title: string;
    rows: { value: string | number, backgroundColor?: string }[][];
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
 * build a spreadsheet context with all needed years and estates.
 * note that the spreadsheet will contain the same number of estates for each year.
 */
export const buildSpreadsheetContext = (sheetStrategy: GoogleSheetWorker, id: string, estates: Estate_filled_Db[], startDate: Date, endDate: Date): SpreadSheet => {

    let spreadSheet = sheetStrategy.getSpreadSheet(id);
    const years = getYearsFromDates(startDate, endDate);

    if( spreadSheet) {
        spreadSheet = createMissingSheets(sheetStrategy, spreadSheet, estates, years);
        spreadSheet = addMissingEstatesInSheets(sheetStrategy, spreadSheet, estates);
        return spreadSheet;
    }else{
        spreadSheet = sheetStrategy.createSpreadSheet(id, 'biens_locatifs');
        spreadSheet = sheetStrategy.addSheets(id, years, estates);
    }

    return spreadSheet;
}

export const composeSpreadSheetUpdates = (sheetStrategy: GoogleSheetWorker, spreadSheetContext: SpreadSheet): SpreadSheetUpdate[] => {
    return null
}

export const applySpreadSheetUpdates = (sheetStrategy: GoogleSheetWorker, spreadSheetUpdates: SpreadSheetUpdate[]) => {
    return null;
}

const createMissingSheets = (sheetStrategy: GoogleSheetWorker, spreadSheet: SpreadSheet, estates: Estate_filled_Db[], years: string[]): SpreadSheet => {
    const sheets = sheetStrategy.getSheets(spreadSheet.id);
    const missingSheetsTitles = getMissingSheetsTitles(sheets, years);
    while(missingSheetsTitles.length > 0){
        spreadSheet = sheetStrategy.addSheet(spreadSheet.id, missingSheetsTitles.pop(), estates);
    }
    return spreadSheet;
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

const getMissingSheetsTitles = (sheets: Sheet[], years: string[]): string[] => {
    const existingYears = sheets.map(sheet => sheet.title);
    return years.filter(year => !existingYears.includes(year));
}