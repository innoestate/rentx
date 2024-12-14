import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { GoogleSheetWorker } from "./google.sheets.buisness";
import { SpreadSheetStrategy } from "./spreadsheets.strategy";

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
export const buildSpreadsheetContext = (sheetStrategy: SpreadSheetStrategy, id: string, estates: Estate_filled_Db[], startDate: Date, endDate: Date): SpreadSheet => {

    let spreadSheet = sheetStrategy.getSpreadSheet(id);
    const years = getYearsFromDates(startDate, endDate);

    if (spreadSheet) {
        spreadSheet = createMissingSheets(sheetStrategy, spreadSheet, estates, years);
        spreadSheet = addMissingEstatesInSheets(sheetStrategy, spreadSheet, estates);
        spreadSheet = removeEstatesInSheets(sheetStrategy, spreadSheet, estates, years);
        return spreadSheet;
    } else {
        spreadSheet = sheetStrategy.createSpreadSheet(id, 'biens_locatifs');
        spreadSheet = sheetStrategy.addSheets(id, years, estates);
    }

    return spreadSheet;
}

export const composeSpreadSheetUpdates = (sheetStrategy: SpreadSheetStrategy, spreadSheetContext: SpreadSheet): SpreadSheetUpdate[] => {
    return null
}

export const applySpreadSheetUpdates = (sheetStrategy: SpreadSheetStrategy, spreadSheetUpdates: SpreadSheetUpdate[]) => {
    return null;
}

const getMissingRows = (spreadSheet: SpreadSheet, estates: Estate_filled_Db[]): { title: string, missingEstates: Estate_filled_Db[] }[] => {
    return spreadSheet.sheets.map(sheet => {
        const missingEstates = estates.filter(estate => !sheet.rows.find(row => row[0].value === estate.owner.name));
        return { title: sheet.title, missingEstates };
    });
}

const removeEstatesInSheets = (sheetStrategy: SpreadSheetStrategy, spreadSheet: SpreadSheet, estates: Estate_filled_Db[], years): SpreadSheet => {

    const rowsToRemove = getUnusedEstates(spreadSheet, estates);
    while (rowsToRemove.length) {
        const row = rowsToRemove.pop();
        spreadSheet = sheetStrategy.removeRowsInSheet(spreadSheet.id, row.title, row.rowIdentifiers);
    }
    return spreadSheet;
}

const getUnusedEstates = (spreadSheet: SpreadSheet, estates: Estate_filled_Db[]): { title: string, rowIdentifiers: { street: string | number, city: string | number }[] }[] => {
    return spreadSheet.sheets.map(sheet => {

        const streetIndex = sheet.rows[0].findIndex(cell => cell.value === 'Adresse');
        const cityIndex = sheet.rows[0].findIndex(cell => cell.value === 'Ville');

        const formatedRows = sheet.rows.map(row => ({ street: row[streetIndex].value, city: row[cityIndex].value })).slice(1);
        const unusedEstatesRows = formatedRows.filter(estateRow => !estates.find(estate => estate.street === estateRow.street && estate.city === estateRow.city));

        return { title: sheet.title, rowIdentifiers: unusedEstatesRows };
    });
}

const addMissingEstatesInSheets = (sheetStrategy: SpreadSheetStrategy, spreadSheet: SpreadSheet, estates: Estate_filled_Db[]): SpreadSheet => {
    const missingRows = getMissingRows(spreadSheet, estates);
    missingRows.forEach(missingRow => {
        spreadSheet = sheetStrategy.addRowsInSheet(spreadSheet.id, missingRow.title, missingRow.missingEstates);
    })
    return spreadSheet;
}

const createMissingSheets = (sheetStrategy: SpreadSheetStrategy, spreadSheet: SpreadSheet, estates: Estate_filled_Db[], years: string[]): SpreadSheet => {
    const sheets = sheetStrategy.getSheets(spreadSheet.id);
    const missingSheetsTitles = getMissingSheetsTitles(sheets, years);
    while (missingSheetsTitles.length > 0) {
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