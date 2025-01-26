import { SpreadSheetStrategy } from "../../spreadsheets/strategies/spreadsheets.strategy";
import { convertProspectionToCells, convertSellerToCells, formatProspections, getMissingProspections, getMissingSellers, getProspectionsCellsUpdates, getProspectionsInRowsThatAreNotInProspections, getProspectionsToRemove, getSellersCellsUpdates, HEADER_BACKGROUND_COLOR, PROSPECTIONS_SHEETS_HEADERS, PROSPECTIONS_SHEETS_TITLES, PROSPECTIONS_SPREADSHEETS_TITLE } from "./spreadsheets.prospection.utils";
import { ProspectionDb } from "../dto/prospection.db";
import { SellerDb } from "src/sellers/models/seller.db";

export const synchronizeProspections = async (spreadSheetStrategy: SpreadSheetStrategy, prospections: ProspectionDb[], sellers: SellerDb[], spreadSheetId?: string) => {
    let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);   
    if (!spreadSheet) {
        spreadSheet = await createProspectionsSpreadsheet(spreadSheetStrategy, PROSPECTIONS_SPREADSHEETS_TITLE);
    }
    const missingProspections = getMissingProspections(spreadSheet, prospections);
    spreadSheet = await addProspectionsSpreadsheet(spreadSheetStrategy, spreadSheet.id, missingProspections, sellers);
    const prospectionsToRemove = getProspectionsInRowsThatAreNotInProspections(spreadSheet, prospections);
    spreadSheet = await removeProspectionsSpreadsheet(spreadSheetStrategy, spreadSheet.id, prospectionsToRemove);

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

    spreadSheetStrategy.addSheets(spreadSheet.id, [
        sheet1,
        sheet2,
        sheet3
    ])
    return spreadSheet;
}

export const addProspectionsSpreadsheet = async (spreadSheetStrategy: SpreadSheetStrategy, spreadSheetId: string, prospections: ProspectionDb[], sellers: SellerDb[]) => {

    let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);
    const missingProspections = getMissingProspections(spreadSheet, prospections);
    const prospectionCells = formatProspections(missingProspections).map(prospection => convertProspectionToCells(prospection, sellers));

    const missingSellers = getMissingSellers(spreadSheet, sellers);
    const sellerCells = missingSellers.map(seller => convertSellerToCells(seller));

    spreadSheet = await spreadSheetStrategy.addRowsInSheets(spreadSheet.id, [
        { sheetTitle: PROSPECTIONS_SHEETS_TITLES[0], missingRows: prospectionCells },
        { sheetTitle: PROSPECTIONS_SHEETS_TITLES[1], missingRows: sellerCells }
    ]);
    return spreadSheet;
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
    let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);

    const prospectionsToRemove = getProspectionsToRemove(spreadSheet, prospections);
    const rowIdentifiers = prospectionsToRemove.map(prospection => ({ lien: prospection.link }));
    spreadSheet = await spreadSheetStrategy.removeRowsInSheet(spreadSheet.id, PROSPECTIONS_SHEETS_TITLES[0], rowIdentifiers);
    const prospectionCells = formatProspections(prospectionsToRemove).map(prospection => convertProspectionToCells(prospection));
    spreadSheet = await spreadSheetStrategy.addRowsInSheets(spreadSheet.id, [
        { sheetTitle: PROSPECTIONS_SHEETS_TITLES[2], missingRows: prospectionCells },
    ])
    return spreadSheet;
}


