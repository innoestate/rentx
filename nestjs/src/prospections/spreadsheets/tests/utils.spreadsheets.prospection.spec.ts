import { convertColumnIndexToLetter } from "../../../spreadsheets/spreadsheets.utils";
import { MockedGoogleSpreadSheetStrategy } from "../../../spreadsheets/strategies/spreadsheets.mocked.strategy";
import { PROSPECTIONS_SHEETS_TITLES, convertProspectionToCells, convertSellerToCells, formatProspections, getHeader, getProspectionsCellsUpdates, getSellersCellsUpdates } from "../spreadsheets.prospection.utils";
import { ProspectionMocked1 } from "./mocks/prospections.mocked";
import { sellerMocked1 } from "./mocks/sellers.mocked";

describe('test spreadsheets prospections utils', () => {
    
    const mockedSpreadSheetStrategy = new MockedGoogleSpreadSheetStrategy();
    let spreadSheetId: string;
    let spreadSheet: any;

    beforeAll(async () => {
        spreadSheet = await mockedSpreadSheetStrategy.createSpreadSheet('spreadSheetTest');
        spreadSheetId = spreadSheet.id;
        const prospections = formatProspections([{...ProspectionMocked1}], [{...sellerMocked1}]);
        const prospectionsCells = convertProspectionToCells(prospections[0]);
        const sellers = [{...sellerMocked1}];
        const sellersCells = convertSellerToCells(sellers[0]);
        spreadSheet = await mockedSpreadSheetStrategy.addSheets('spreadSheetTest', [
            {title: PROSPECTIONS_SHEETS_TITLES[0], header: getHeader(PROSPECTIONS_SHEETS_TITLES[0]), rows: [prospectionsCells]},
            {title: PROSPECTIONS_SHEETS_TITLES[1], header: getHeader(PROSPECTIONS_SHEETS_TITLES[1]), rows: [sellersCells]}
        ]);
    })

    it('should return a cell to update', async () => {
        const prospectionBuilded = formatProspections([ProspectionMocked1], [sellerMocked1])[0];
        const linkIndex = spreadSheet.sheets[0].rows[0].findIndex(cell => cell.value === 'lien');
        const addressIndex = spreadSheet.sheets[0].rows[0].findIndex(cell => cell.value === 'adresse');
        expect(spreadSheet.sheets[0].rows[1][linkIndex]?.value).toEqual(ProspectionMocked1.link);
        const cellsUpdates = getProspectionsCellsUpdates(spreadSheet, [{...prospectionBuilded, address: 'new address'}]);

        const column = convertColumnIndexToLetter(addressIndex);
        expect(cellsUpdates[0].cell).toEqual(`${column}2`);

    })

    it('should return a seller cell to update', async () => {
    
        const spreadSheet = await mockedSpreadSheetStrategy.getSpreadSheet(spreadSheetId);
        const addressColumnIndex = spreadSheet.sheets[1].rows[0].findIndex(cell => cell.value === 'adresse');
        const cellsUpdates = getSellersCellsUpdates(spreadSheet, [{...sellerMocked1, address: 'new address'}]);
        const column = convertColumnIndexToLetter(addressColumnIndex);
        expect(cellsUpdates[0].cell).toEqual(`${column}2`);
        expect(cellsUpdates[0].value).toEqual('new address');

    })


})