import { SellerDb } from "../../sellers/models/seller.db";
import { Cell, SpreadSheet, SpreadSheetUpdate } from "../../spreadsheets/models/spreadsheets.model";
import { ProspectionBuilded } from "../dto/prospection.builded";
import { ProspectionDb } from "../dto/prospection.db";
import { PropertyStatusTranslation } from "../dto/prospection.dto";

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

export const getProspectionsCellsUpdates = (spreadSheet: SpreadSheet, prospections: ProspectionDb[]): SpreadSheetUpdate[] => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === PROSPECTIONS_SHEETS_TITLES[0]);
    const linkColumnIndex = sheet?.rows[0].findIndex(cell => cell.value === 'lien');
    const updates: SpreadSheetUpdate[] = [];
    const formatedProspections = formatProspections(prospections);

    formatedProspections.forEach(prospection => {
        const rowIndex = sheet?.rows.findIndex(row => row[linkColumnIndex].value === prospection.link);
        if (rowIndex !== -1) {

            const newCells = convertProspectionToCells(prospection);
            const actualCells = sheet.rows[rowIndex];

            newCells.forEach((newCell, index) => {
                if (newCell.value !== actualCells[index].value) {
                    updates.push({
                        sheetTitle: PROSPECTIONS_SHEETS_TITLES[0],
                        cell: String.fromCharCode(65 + index) + (rowIndex + 1),
                        value: newCell.value
                    });
                }
            });

        }

    });

    return updates;
}

export const getSellersCellsUpdates = (spreadSheet: SpreadSheet, sellers: SellerDb[]): SpreadSheetUpdate[] => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === PROSPECTIONS_SHEETS_TITLES[1]);
    const nameColumnIndex = sheet?.rows[0].findIndex(cell => cell.value === 'nom');
    const updates: SpreadSheetUpdate[] = [];

    sellers.forEach(seller => {

        const rowIndex = sheet?.rows.findIndex(row => row[nameColumnIndex].value === seller.name);
        if (rowIndex !== -1) {

            const newCells = convertSellerToCells(seller);
            const actualCells = sheet.rows[rowIndex];

            newCells.forEach((newCell, columnIndex) => {
                if (newCell.value !== actualCells[columnIndex].value) {
                    updates.push({
                        sheetTitle: PROSPECTIONS_SHEETS_TITLES[1],
                        cell: String.fromCharCode(65 + columnIndex) + (rowIndex + 1),
                        value: newCell.value
                    });
                }
            });
        }

    });

    return updates;
}

export const getProspectionsToRemove = (spreadSheet: SpreadSheet, prospections: ProspectionDb[]): ProspectionDb[] => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === PROSPECTIONS_SHEETS_TITLES[0]);
    const linkIndex = sheet?.rows[0].findIndex(cell => cell.value === 'lien');
    return prospections.filter(prospection => sheet?.rows.find(cells => cells[linkIndex].value === prospection.link));
}

export const getMissingProspections = (spreadSheet: SpreadSheet, prospections: ProspectionDb[]): ProspectionDb[] => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === PROSPECTIONS_SHEETS_TITLES[0]);
    const linkIndex = sheet?.rows[0].findIndex(cell => cell.value === 'lien');
    return prospections.filter(prospection => !sheet?.rows.find(cells => cells[linkIndex].value === prospection.link));
}

export const getMissingSellers = (spreadSheet: SpreadSheet, sellers: SellerDb[]): SellerDb[] => {
    const sheet = spreadSheet.sheets.find(sheet => sheet.title === PROSPECTIONS_SHEETS_TITLES[1]);
    const linkIndex = sheet?.rows[0].findIndex(cell => cell.value === 'nom');
    return sellers.filter(seller => !sheet?.rows.find(cells => cells[linkIndex].value === seller.name));
}

export const convertProspectionToCells = (prospection: ProspectionBuilded, sellers?: SellerDb[]): Cell[] => {

    const seller = sellers?.find(seller => seller.id === prospection.seller_id);

    const cells = [
        { value: prospection.zip ?? '' },
        { value: prospection.city ?? '' },
        { value: prospection.address ?? '' },
        { value: prospection.link ?? '' },
        { value: seller?.name ?? '' },
        { value: seller?.phone ?? '' },
        { value: seller?.email ?? '' },
        { value: prospection.price ?? '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: prospection.statusTranslated ?? '' },
        { value: prospection.resume ?? '' },
        { value: '' }
    ]
    return cells;
}

export const convertSellerToCells = (seller: SellerDb): Cell[] => {
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

export const formatProspections = (prospections: ProspectionDb[]): ProspectionBuilded[] => {
    return prospections.map(prospection => {
        return {
            ...prospection,
            statusTranslated: prospection.status ? PropertyStatusTranslation[prospection.status] ?? '' : prospection.status
        }
    })
}

export const getHeader = (sheetTitle: string) => {
    return PROSPECTIONS_SHEETS_HEADERS[sheetTitle].map(value => ({ value, backgroundColor: HEADER_BACKGROUND_COLOR }));
}