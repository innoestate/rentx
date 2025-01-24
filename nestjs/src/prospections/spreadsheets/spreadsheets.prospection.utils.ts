import { Cell, SpreadSheet } from "src/spreadsheets/models/spreadsheets.model";
import { SpreadSheetStrategy } from "src/spreadsheets/strategies/spreadsheets.strategy";
import { ProspectionDb } from "../dto/prospection.db";
import { SellerDb } from "src/sellers/models/seller.db";

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
        'nom',
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

export const addProspectionsSpreadsheet = async (spreadSheetStrategy: SpreadSheetStrategy, spreadSheetId: string, prospections: ProspectionDb[], sellers: SellerDb[]) => {

    let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);
    const missingProspections = getMissingProspections(spreadSheet, prospections);
    const prospectionCells = missingProspections.map(prospection => convertProspectionToCells(prospection));

    const missingSellers = getMissingSellers(spreadSheet, sellers);
    const sellerCells = missingSellers.map(seller => convertSellerToCells(seller));

    spreadSheet = await spreadSheetStrategy.addRowsInSheets(spreadSheet.id, [
        { sheetTitle: PROSPECTIONS_SHEETS_TITLES[0], missingRows: prospectionCells },
        { sheetTitle: PROSPECTIONS_SHEETS_TITLES[1], missingRows: sellerCells }
    ]);
    return spreadSheet;
}

export const removeProspectionsSpreadsheet = async (spreadSheetStrategy: SpreadSheetStrategy, spreadSheetId: string, prospections: ProspectionDb[]) => {
    let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);

    const missingProspections = getProspectionsToRemove(spreadSheet, prospections);
    const rowIdentifiers = missingProspections.map(prospection => ({ lien: prospection.link }));
    spreadSheet = await spreadSheetStrategy.removeRowsInSheet(spreadSheet.id, PROSPECTIONS_SHEETS_TITLES[0], rowIdentifiers);
    const prospectionCells = missingProspections.map(prospection => convertProspectionToCells(prospection));
    spreadSheet = await spreadSheetStrategy.addRowsInSheets(spreadSheet.id, [
        { sheetTitle: PROSPECTIONS_SHEETS_TITLES[2], missingRows: prospectionCells },
    ])
    return spreadSheet;
}

const getProspectionsToRemove = (spreadSheet: SpreadSheet, prospections: ProspectionDb[]): ProspectionDb[] => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === PROSPECTIONS_SHEETS_TITLES[0]);
    const linkIndex = sheet?.rows[0].findIndex(cell => cell.value === 'lien');
    return prospections.filter(prospection => sheet?.rows.find(cells => cells[linkIndex].value === prospection.link));
}

const getMissingProspections = (spreadSheet: SpreadSheet, prospections: ProspectionDb[]): ProspectionDb[] => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === PROSPECTIONS_SHEETS_TITLES[0]);
    const linkIndex = sheet?.rows[0].findIndex(cell => cell.value === 'lien');
    return prospections.filter(prospection => !sheet?.rows.find(cells => cells[linkIndex].value === prospection.link));
}

const getMissingSellers = (spreadSheet: SpreadSheet, sellers: SellerDb[]): SellerDb[] => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === PROSPECTIONS_SHEETS_TITLES[1]);
    const linkIndex = sheet?.rows[0].findIndex(cell => cell.value === 'nom');
    return sellers.filter(seller => !sheet?.rows.find(cells => cells[linkIndex].value === seller.name));
}

const convertProspectionToCells = (prospection: ProspectionDb): Cell[] => {

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

const convertSellerToCells = (seller: SellerDb): Cell[] => {
    const cells = [
        { value: seller.name ?? '' },
        { value: seller.agency ?? '' },
        { value: seller.zip ?? '' },
        { value: seller.city ?? '' },
        { value: seller.address ?? '' },
        { value: seller.phone ?? '' },
        { value: seller.email ?? '' }
    ]
    return cells;
}