import { Cell, SpreadSheet } from "src/spreadsheets/models/spreadsheets.model";
import { SpreadSheetStrategy } from "src/spreadsheets/strategies/spreadsheets.strategy";
import { ProspectionDb } from "../dto/prospection.db";

export const PROSPECTIONS_SPREADSHEETS_TITLE = 'Prospections immobilier';
export const PROSPECTIONS_SHEETS_TITLES = ['Prospections', 'Vendeurs', 'Archives'];
export const PROSPECTIONS_SHEETS_HEADERS = {
    Prospections: [
        'CP',
        'ville',
        'adresse',
        'lien',
        'vendeur',
        'téléphone',
        'email',
        'prix',
        'offre',
        'm2',
        'loyers',
        'rentabilité',
        'status',
        'description',
        'notes'
    ],
    Vendeurs: [
        'Nom',
        'agence',
        'CP',
        'ville',
        'adresse',
        'telephone',
        'email'
    ],
    Archives: [
        'CP',
        'ville',
        'adresse',
        'lien',
        'vendeur',
        'téléphone',
        'email',
        'prix',
        'offre',
        'm2',
        'loyers',
        'rentabilité',
        'status',
        'description',
        'notes'
    ]
};
export const HEADER_BACKGROUND_COLOR = {
    red: 0.75,
    green: 0.75,
    blue: 0.75
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

export const addProspectionsSpreadsheet = async (spreadSheetStrategy: SpreadSheetStrategy, spreadSheetId: string, prospections: ProspectionDb[]) => {

    let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);
    const missingProspections = getMissingProspections(spreadSheet, prospections);
    const cells = missingProspections.map(prospection => convertProspectionToCells(prospection));
    spreadSheet = await spreadSheetStrategy.addRowsInSheets(spreadSheet.id, [{ sheetTitle: PROSPECTIONS_SHEETS_TITLES[0], missingRows: cells }]);
    return spreadSheet;
}

const getMissingProspections = (spreadSheet: SpreadSheet, prospections: ProspectionDb[]): ProspectionDb[] => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === PROSPECTIONS_SHEETS_TITLES[0]);
    const linkIndex = sheet?.rows[0].findIndex(cell => cell.value === 'lien');
    return prospections.filter(prospection => !sheet?.rows.find(cells => cells[linkIndex].value === prospection.link));
}

export const convertProspectionToCells = (prospection: ProspectionDb): Cell[] => {

    const cells = [
        { value: prospection.zip ?? '' },
        { value: prospection.city ?? '' },
        { value: prospection.address ?? '' },
        { value: prospection.link ?? '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: prospection.price ?? '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: prospection.status },
        { value: prospection.resume ?? '' },
        { value: '' }
    ]
    return cells;
}