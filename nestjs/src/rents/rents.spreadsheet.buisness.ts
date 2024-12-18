import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
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
export const buildSpreadsheetContext = async (sheetStrategy: SpreadSheetStrategy, id: string, estates: Estate_filled_Db[], startDate: Date, endDate: Date): Promise<{ spreadSheet: SpreadSheet, hasBeenRemoved: boolean }> => {
    try {
        let spreadSheet = await sheetStrategy.getSpreadSheet(id);
        let hasBeenRemoved = id && !spreadSheet;
        const years = getYearsFromDates(startDate, endDate);

        if (spreadSheet) {
            spreadSheet = await createMissingSheets(sheetStrategy, spreadSheet, estates, years);
            spreadSheet = await addMissingEstatesInSheets(sheetStrategy, spreadSheet, estates);
            spreadSheet = await removeEstatesInSheets(sheetStrategy, spreadSheet, estates, years);
            return { spreadSheet, hasBeenRemoved };
        } else {
            spreadSheet = await sheetStrategy.createSpreadSheet('biens_locatifs');
            spreadSheet = await sheetStrategy.addSheets(spreadSheet.id, years, estates);
        }
        return { spreadSheet, hasBeenRemoved };
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const composeSpreadSheetUpdates = (sheetStrategy: SpreadSheetStrategy, spreadSheetContext: SpreadSheet): SpreadSheetUpdate[] => {
    return null
}

export const applySpreadSheetUpdates = (sheetStrategy: SpreadSheetStrategy, spreadSheetUpdates: SpreadSheetUpdate[]) => {
    return null;
}

const getMissingRows = (spreadSheet: SpreadSheet, estates: Estate_filled_Db[]): { sheetTitle: string, missingEstates: Estate_filled_Db[] }[] => {
    return spreadSheet.sheets.map(sheet => {
        if (sheet.rows.length > 1) {
            const streetIndex = sheet.rows[0].findIndex(cell => cell.value === 'Adresse');
            const cityIndex = sheet.rows[0].findIndex(cell => cell.value === 'Ville');
            const plotIndex = sheet.rows[0].findIndex(cell => cell.value === 'Lot');

            const missingEstates = estates.filter(estate => !sheet.rows.find(row => (row[streetIndex]?.value === estate.street
                && (!estate.city || row[cityIndex]?.value === estate.city)
                && (!estate.plot || row[plotIndex]?.value === estate.plot))));
            return { sheetTitle: sheet.title, missingEstates };
        }
        return { sheetTitle: sheet.title, missingEstates: [] }
    });
}

const removeEstatesInSheets = async (sheetStrategy: SpreadSheetStrategy, spreadSheet: SpreadSheet, estates: Estate_filled_Db[], years): Promise<SpreadSheet> => {
    const rowsToRemove = getUnusedEstates(spreadSheet, estates);
    spreadSheet = await sheetStrategy.removeRowsInSheets(spreadSheet.id, rowsToRemove);
    return spreadSheet;
}

const getUnusedEstates = (spreadSheet: SpreadSheet, estates: Estate_filled_Db[]): { street: string | number, city: string | number, plot?: string }[] => {
    return spreadSheet.sheets.reduce((acc, sheet) => {

        const streetIndex = sheet.rows[0].findIndex(cell => cell.value === 'Adresse');
        const cityIndex = sheet.rows[0].findIndex(cell => cell.value === 'Ville');
        const plotIndex = sheet.rows[0].findIndex(cell => cell.value === 'Plot');

        const formatedRows = sheet.rows.map(row => ({ street: row[streetIndex].value, city: row[cityIndex].value, plot: row[plotIndex] })).slice(1);
        const unusedEstatesRows = formatedRows.filter(estateRow => !estates.find(estate => compareEstateToRow(estate, estateRow.street, estateRow.city, estateRow.plot)));
                
        const uniqueUnusedEstatesRows = unusedEstatesRows.filter( unused => acc.find( a => compareEstateToRow(a as {street, city, plot}, unused.street, unused.city, unused.plot)));

        return [...acc, uniqueUnusedEstatesRows];
    }, []);
}

export const compareEstateToRow = (estate: Estate_filled_Db | {street, city, plot}, street, city, plot) => {
    return estate.street === street && (!city || city === '' || estate.city === city) && (!plot || plot === '' || estate.plot === plot);
}

const addMissingEstatesInSheets = async (sheetStrategy: SpreadSheetStrategy, spreadSheet: SpreadSheet, estates: Estate_filled_Db[]): Promise<SpreadSheet> => {
    const missingRows = getMissingRows(spreadSheet, estates);
    spreadSheet = await sheetStrategy.addRowsInSheets(spreadSheet.id, missingRows);
    return spreadSheet;
}

const createMissingSheets = async (sheetStrategy: SpreadSheetStrategy, spreadSheet: SpreadSheet, estates: Estate_filled_Db[], years: string[]): Promise<SpreadSheet> => {
    const sheets = await sheetStrategy.getSheets(spreadSheet.id);
    const missingSheetsTitles = getMissingSheetsTitles(sheets, years);
    while (missingSheetsTitles.length > 0) {
        spreadSheet = await sheetStrategy.addSheet(spreadSheet.id, missingSheetsTitles.pop(), estates);
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