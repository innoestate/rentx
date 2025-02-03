import { MockedGoogleSpreadSheetStrategy } from "../../../spreadsheets/strategies/spreadsheets.mocked.strategy";
import { estate1 } from "../../tests/estates.mocks";
import { rent2021_01 } from "../../tests/rents.mocks";
import { buildSpreadsheetContext } from "../rents.spreadsheets.business";
import { getPaidUpdatesRentsCells } from "../rents.spreadsheets.utils";

describe('test rents spreadsheets updates', () => {

    let mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();


    it('should full a spreadsheet with one rent', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();

        const rents = [{ ...rent2021_01 }];
        const estates = [{ ...estate1 }];
        let { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, estates, new Date('2021-01-01'), new Date('2021-01-31'));
        const updateCells = getPaidUpdatesRentsCells(spreadSheet, rents, estates);
        spreadSheet = await mockedGoogleWorker.updateCells(spreadSheet, updateCells);
        expect(spreadSheet.sheets[0].rows[1][5].value).toEqual(1100);
        expect(spreadSheet.sheets[0].rows[1][5].backgroundColor.green).toEqual(1);
        expect(spreadSheet.sheets[0].rows[1][5].backgroundColor.red).toEqual(0);
        expect(spreadSheet.sheets[0].rows[1][5].backgroundColor.blue).toEqual(0);
    })

})