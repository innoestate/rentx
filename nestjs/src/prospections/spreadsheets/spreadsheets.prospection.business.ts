import { SpreadSheetStrategy } from "../../spreadsheets/strategies/spreadsheets.strategy";
import { convertProspectionToCells, convertSellerToCells, formatProspections, getMissingProspections, getMissingSellers, getProspectionsCellsUpdates, getProspectionsInRowsThatAreNotInProspections, getProspectionsToRemove, getSellersCellsUpdates, HEADER_BACKGROUND_COLOR, PROSPECTIONS_SHEETS_HEADERS, PROSPECTIONS_SHEETS_TITLES, PROSPECTIONS_SPREADSHEETS_TITLE } from "./spreadsheets.prospection.utils";
import { ProspectionDb } from "../dto/prospection.db";
import { SellerDb } from "src/sellers/models/seller.db";
import { SpreadSheet } from "src/spreadsheets/models/spreadsheets.model";

export const synchronizeProspections = async (spreadSheetStrategy: SpreadSheetStrategy, prospections: ProspectionDb[], sellers: SellerDb[], spreadSheetId?: string): Promise<SpreadSheet> => {

    let spreadSheet;
    if (spreadSheetId) {
        spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);
    }
    if (!spreadSheet) {
        spreadSheet = await createProspectionsSpreadsheet(spreadSheetStrategy, PROSPECTIONS_SPREADSHEETS_TITLE);
    }
    const missingProspections = getMissingProspections(spreadSheet, prospections);
    spreadSheet = await addProspectionsSpreadsheet(spreadSheetStrategy, spreadSheet.id, missingProspections, sellers);
    spreadSheet = await updateProspectionsSpreadsheet(spreadSheetStrategy, spreadSheet.id, prospections);
    const prospectionsToRemove = getProspectionsInRowsThatAreNotInProspections(spreadSheet, prospections);
    spreadSheet = (await removeProspectionsSpreadsheet(spreadSheetStrategy, spreadSheet.id, prospectionsToRemove)) || spreadSheet;

    return spreadSheet;
}

export const createProspectionsSpreadsheet = async (spreadSheetStrategy: SpreadSheetStrategy, title: string) => {
    const spreadSheet = await spreadSheetStrategy.createSpreadSheet(title);

    const sheet1 = {
        title: PROSPECTIONS_SHEETS_TITLES[0],
        header: PROSPECTIONS_SHEETS_HEADERS[PROSPECTIONS_SHEETS_TITLES[0]].map(value => ({ value, backgroundColor: HEADER_BACKGROUND_COLOR })),
        rows: []
    }
    const sheet2 = {
        title: PROSPECTIONS_SHEETS_TITLES[1],
        header: PROSPECTIONS_SHEETS_HEADERS[PROSPECTIONS_SHEETS_TITLES[1]].map(value => ({ value, backgroundColor: HEADER_BACKGROUND_COLOR })),
        rows: []
    }
    const sheet3 = {
        title: PROSPECTIONS_SHEETS_TITLES[2],
        header: PROSPECTIONS_SHEETS_HEADERS[PROSPECTIONS_SHEETS_TITLES[2]].map(value => ({ value, backgroundColor: HEADER_BACKGROUND_COLOR })),
        rows: []
    }

    return await spreadSheetStrategy.addSheets(spreadSheet.id, [
        sheet1,
        sheet2,
        sheet3
    ])
}

export const addProspectionsSpreadsheet = async (spreadSheetStrategy: SpreadSheetStrategy, spreadSheetId: string, prospections: ProspectionDb[], sellers: SellerDb[]) => {
    try {
        let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);
        const missingProspections = getMissingProspections(spreadSheet, prospections);
        const prospectionCells = formatProspections(missingProspections, sellers).map(prospection => convertProspectionToCells(prospection));

        const missingSellers = getMissingSellers(spreadSheet, sellers);
        const sellerCells = missingSellers.map(seller => convertSellerToCells(seller));

        spreadSheet = await spreadSheetStrategy.addRowsInSheets(spreadSheet.id, [
            { sheetTitle: PROSPECTIONS_SHEETS_TITLES[0], missingRows: prospectionCells },
            { sheetTitle: PROSPECTIONS_SHEETS_TITLES[1], missingRows: sellerCells }
        ]);
        return spreadSheet;
    } catch (e) {
        console.error('Error addProspectionsSpreadsheet', e);
        return null;
    }
}

export const updateProspectionsSpreadsheet = async (spreadSheetStrategy: SpreadSheetStrategy, spreadSheetId: string, prospections: ProspectionDb[]) => {
    let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);
    const prospectionCells = getProspectionsCellsUpdates(spreadSheet, prospections);
    spreadSheet = await spreadSheetStrategy.updateCells(spreadSheet, prospectionCells);
    return spreadSheet;
}

export const updateSellersSpreadsheet = async (spreadSheetStrategy: SpreadSheetStrategy, spreadSheetId: string, sellers: SellerDb[]) => {
    let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);
    const sellersUpdates = getSellersCellsUpdates(spreadSheet, sellers);
    spreadSheet = await spreadSheetStrategy.updateCells(spreadSheet, sellersUpdates);
    return spreadSheet;
}

export const removeProspectionsSpreadsheet = async (spreadSheetStrategy: SpreadSheetStrategy, spreadSheetId: string, prospections: ProspectionDb[]) => {
    if (prospections.length === 0) return null;
    try {
        let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);
        const prospectionsToRemove = getProspectionsToRemove(spreadSheet, prospections);
        if (prospectionsToRemove.length) {
            const rowIdentifiers = prospectionsToRemove.map(prospection => ({ lien: prospection.link }));
            spreadSheet = await spreadSheetStrategy.removeRowsInSheet(spreadSheet.id, PROSPECTIONS_SHEETS_TITLES[0], rowIdentifiers);
            const prospectionCells = formatProspections(prospectionsToRemove, []).map(prospection => convertProspectionToCells(prospection));
            return await spreadSheetStrategy.addRowsInSheets(spreadSheet.id, [
                { sheetTitle: PROSPECTIONS_SHEETS_TITLES[2], missingRows: prospectionCells },
            ])
        } else {
            return spreadSheet;
        }
    } catch (e) {
        console.error('Error removeProspectionsSpreadsheet', e);
        return null;
    }
}


