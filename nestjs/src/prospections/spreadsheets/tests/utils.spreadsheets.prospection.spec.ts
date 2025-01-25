import { convertColumnIndexToLetter } from "../../../spreadsheets/spreadsheets.utils";
import { MockedGoogleSpreadSheetStrategy } from "../../../spreadsheets/strategies/spreadsheets.mocked.strategy";
import { PROSPECTIONS_SHEETS_TITLES, convertProspectionToCells, formatProspections, getHeader, getProspectionsCellsUpdates } from "../spreadsheets.prospection.utils";
import { ProspectionMocked1 } from "./prospections.mocked";

describe('test spreadsheets prospections utils', () => {
    
    const mockedSpreadSheetStrategy = new MockedGoogleSpreadSheetStrategy();
    let spreadSheetId: string;

    it('should return a cell to update', async () => {

        const prospections = formatProspections([{...ProspectionMocked1}]);
        let spreadSheet = await mockedSpreadSheetStrategy.createSpreadSheet('spreadSheetTest');
        spreadSheetId = spreadSheet.id;
        const cells = convertProspectionToCells(prospections[0]);
        spreadSheet = await mockedSpreadSheetStrategy.addSheets('spreadSheetTest', [{title: PROSPECTIONS_SHEETS_TITLES[0], header: getHeader(PROSPECTIONS_SHEETS_TITLES[0]), rows: [cells]}]);
        const linkIndex = spreadSheet.sheets[0].rows[0].findIndex(cell => cell.value === 'lien');
        const addressIndex = spreadSheet.sheets[0].rows[0].findIndex(cell => cell.value === 'adresse');
        expect(spreadSheet.sheets[0].rows[1][linkIndex]?.value).toEqual(prospections[0].link);
        const cellsUpdates = getProspectionsCellsUpdates(spreadSheet, [{...prospections[0], address: 'new address'}]);

        const column = convertColumnIndexToLetter(addressIndex);
        expect(cellsUpdates[0].cell).toEqual(`${column}2`);

    })

})