import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { Sheet, SpreadSheet, SpreadSheetUpdate } from "./models/spreadsheets.model";
import { Rent_Db } from "../models/rents.db.model";
import { fusionateRents, getRentsByMonth } from "../rents.utils";
import { MONTHS } from "./strategies/spreadsheets.google.strategy";

export const getSpreadSheetRentsCells = (spreadSheetContext: SpreadSheet, rents: Rent_Db[], estates: Estate_filled_Db[]): SpreadSheetUpdate[] => {


    const fusionnedRents = fusionateRents(rents, estates);
    const rentsByMonths = getRentsByMonth(fusionnedRents);
    const spreadSheetUpdates = [];

    rentsByMonths.forEach(rentByMonth => {
        const rowIdentifier = estates.find(estate => estate.id === rentByMonth.estateId);
        const streetIndex = spreadSheetContext.sheets[0].rows[0].findIndex(cell => cell.value === 'Adresse') ?? 2;
        const cityIndex = spreadSheetContext.sheets[0].rows[0].findIndex(cell => cell.value === 'Ville') ?? 3;
        const plotIndex = spreadSheetContext.sheets[0].rows[0].findIndex(cell => cell.value === 'Lot') ?? 4;
        const rowEstateIndex = spreadSheetContext.sheets[0].rows.findIndex(rows => {
            if (estateIsSameThatRow(rowIdentifier, rows[streetIndex].value, rows[cityIndex].value, rows[plotIndex].value)) {
                return true;
            }
            return false;
        }) + 1;

        rentByMonth.rents.forEach(rent => {
            const sheet = spreadSheetContext.sheets.find(sheet => sheet.title === rent.year + '');
            if (sheet) {
                const monthTitle = MONTHS[rent.month];
                const monthIndex = sheet.rows[0].findIndex(cell => cell.value === monthTitle);
                spreadSheetUpdates.push({
                    sheetTitle: sheet.title,
                    cell: String.fromCharCode(65 + monthIndex) + rowEstateIndex,
                    backgroundColor: '#00FF00',
                    value: rent.rent
                })
            }
        })
    });
    return spreadSheetUpdates;
}

export const getMissingRows = (spreadSheet: SpreadSheet, estates: Estate_filled_Db[]): { sheetTitle: string, missingEstates: Estate_filled_Db[] }[] => {
    return spreadSheet.sheets.map(sheet => {
        if (sheet.rows.length > 1) {
            const streetIndex = sheet.rows[0].findIndex(cell => cell.value === 'Adresse');
            const cityIndex = sheet.rows[0].findIndex(cell => cell.value === 'Ville');
            const plotIndex = sheet.rows[0].findIndex(cell => cell.value === 'Lot');

            const estatesRows = sheet.rows.slice(1, sheet.rows.length);

            const missingEstates = estates.filter(estate => !estatesRows.find(row => estateIsSameThatRow(estate, row[streetIndex].value, row[cityIndex].value, row[plotIndex].value)));
            return { sheetTitle: sheet.title, missingEstates };
        }
        return { sheetTitle: sheet.title, missingEstates: [] }
    });
}

export const getUnusedEstates = (spreadSheet: SpreadSheet, estates: Estate_filled_Db[]): { street: string | number, city: string | number, plot?: string }[] => {
    return spreadSheet.sheets.reduce((acc, sheet) => {

        const streetIndex = sheet.rows[0].findIndex(cell => cell.value === 'Adresse');
        const cityIndex = sheet.rows[0].findIndex(cell => cell.value === 'Ville');
        const plotIndex = sheet.rows[0].findIndex(cell => cell.value === 'Lot');

        const formatedRows = sheet.rows.map(row => ({ street: row[streetIndex].value, city: row[cityIndex].value, plot: row[plotIndex].value })).slice(1);
        const unusedEstatesRows = formatedRows.filter(estateRow => rowNotExistInEstates(estateRow, estates));
        const uniqueUnusedEstatesRows = unusedEstatesRows.filter(unused => !acc.find(a => estateIsSameThatRow(a as { street, city, plot }, unused.street, unused.city, unused.plot)));

        return [...acc, ...uniqueUnusedEstatesRows];
    }, []);
}

export const rowNotExistInEstates = (row: { street, city, plot }, estates: Estate_filled_Db[]) => {
    if (estates.find(estate => estateIsSameThatRow(estate, row.street, row.city, row.plot))) {
        return false;
    }
    return true;
}

export const getYearsFromDates = (startDate: Date, endDate: Date): string[] => {
    const years: string[] = [];
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    for (let i = startYear; i <= endYear; i++) {
        years.push(i.toString());
    }
    return years;
}

export const getMissingSheetsTitles = (sheets: Sheet[], years: string[]): string[] => {
    const existingYears = sheets.map(sheet => sheet.title);
    return years.filter(year => !existingYears.includes(year));
}

export const estateIsSameThatRow = (estate: Estate_filled_Db | { street, city, plot }, street, city, plot) => {
    return estate.street === street
        && (((!city || city === '') && (!estate?.city || estate?.city === '')) || (city === '' && estate?.city === '') || estate?.city === city)
        && (((!plot || plot === '') && (!estate?.plot || estate?.plot === '')) || (plot === '' && estate?.plot === '') || estate?.plot === plot);
}