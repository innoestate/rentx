import { MockedGoogleSpreadSheetStrategy } from "../strategies/spreadsheets.mocked.strategy";
import { estate1 } from "../../../rents/tests/estates.mocks";
import { rent2021_01 } from "../../../rents/tests/rents.mocks";
import { buildSpreadsheetContext } from "../rents.spreadsheets.business";
import { getSpreadSheetRentsCells } from "../spreadsheets.utils";

describe('test rents spreadsheets updates', () => {

    let mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();


    it('should full a spreadsheet with one rent', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();

        const rents = [{ ...rent2021_01 }];
        const estates = [{ ...estate1 }];
        let { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, estates, new Date('2021-01-01'), new Date('2021-01-31'));
        const updateCells = getSpreadSheetRentsCells(spreadSheet, rents, estates);
        spreadSheet = await mockedGoogleWorker.updateCells(spreadSheet, updateCells);
        expect(spreadSheet.sheets[0].rows[1][5].value).toEqual(1100);
        expect(spreadSheet.sheets[0].rows[1][5].backgroundColor).toEqual('#00FF00');
    })

})