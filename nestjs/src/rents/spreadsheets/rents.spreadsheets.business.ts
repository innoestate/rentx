import { Estate_filled_Db } from "../../estates/estate-filled-db.model";
import { SpreadSheetStrategy } from "../../spreadsheets/strategies/spreadsheets.strategy";
import { convertEstatesToSheetRows, EstatesSheetsHeader, getMissingRows, getMissingSheetsTitles, getPaidUpdatesRentsCells, getUnusedEstates, getYearsFromDates } from "./rents.spreadsheets.utils";
import { SpreadSheet, SpreadSheetUpdate } from "../../spreadsheets/models/spreadsheets.model";
import { Rent_Db } from "../models/rents.db.model";

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
            spreadSheet = await removeEstatesInSheets(sheetStrategy, spreadSheet, estates);
            return { spreadSheet, hasBeenRemoved };
        } else {
            spreadSheet = await sheetStrategy.createSpreadSheet('biens_locatifs');
            spreadSheet = await sheetStrategy.addSheets(spreadSheet.id, years.map( year => ({ title: year, header: [...EstatesSheetsHeader], rows: convertEstatesToSheetRows(estates) })));
        }
        return { spreadSheet, hasBeenRemoved };
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const fillSpreadSheetCells = async (sheetStrategy: SpreadSheetStrategy, spreadSheet: SpreadSheet, rents: Rent_Db[], estates: Estate_filled_Db[]): Promise<SpreadSheet> => {
    const updateCells = getPaidUpdatesRentsCells(spreadSheet, rents, estates);
    spreadSheet = await sheetStrategy.updateCells(spreadSheet, updateCells);
    return spreadSheet;
}

const removeEstatesInSheets = async (sheetStrategy: SpreadSheetStrategy, spreadSheet: SpreadSheet, estates: Estate_filled_Db[]): Promise<SpreadSheet> => {
    const rowsToRemove = getUnusedEstates(spreadSheet, estates);
    if (rowsToRemove.length) {
        spreadSheet = await sheetStrategy.removeRowsInSheets(spreadSheet.id, rowsToRemove.map( rows => ({ Adresse: rows.street, Ville: rows.city, Lot: rows.plot }) ));
    }
    return spreadSheet;
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
        spreadSheet = await sheetStrategy.addSheet(spreadSheet.id, missingSheetsTitles.pop(), EstatesSheetsHeader, convertEstatesToSheetRows(estates));
    }
    return spreadSheet;
}

