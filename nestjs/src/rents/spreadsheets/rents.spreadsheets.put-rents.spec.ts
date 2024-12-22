import { getStartAndEnDatesFromRents } from '../rents.utils';
import { estate1, estate2 } from '../tests/estates.mocks';
import { rent2024_02, rent2024_03, rent2024_04 } from '../tests/rents.mocks';
import { buildSpreadsheetContext, getSpreadSheetRentsCells } from './rents.spreadsheets.business';
import { MockedGoogleSpreadSheetStrategy } from './spreadsheets.mocked.strategy';


describe('updating spreadsheet after building context', () => {

    let mockedGoogleWorker: MockedGoogleSpreadSheetStrategy;
    let spreadSheetId: string;

    it('build a spreadsheet and update a rent', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();
        const { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, [{ ...estate1 }], new Date('2024-02-01'), new Date('2024-02-29'));
        const sheetsUpdates = getSpreadSheetRentsCells(mockedGoogleWorker, spreadSheet, [{...rent2024_02}]);
        expect(sheetsUpdates[0].sheetTitle).toEqual('2024');
        expect(sheetsUpdates[0].cell).toEqual('G2');
        expect(sheetsUpdates[0].value).toEqual(1100);
        expect(sheetsUpdates[0].backgroundColor).toEqual('#00FF00');
        spreadSheetId = spreadSheet.id;
    })

    it('build a spreadsheet and update 2 rents', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();

        const { startDate, endDate } = getStartAndEnDatesFromRents([{ ...rent2024_02 }, { ...rent2024_03 }]);
        const { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, [{ ...estate1 }], startDate, endDate);
        const sheetsUpdates = getSpreadSheetRentsCells(mockedGoogleWorker, spreadSheet, [{ ...rent2024_02 }, { ...rent2024_03 }]);
        expect(sheetsUpdates[0].sheetTitle).toEqual('2024');
        expect(sheetsUpdates[0].cell).toEqual('G2');
        expect(sheetsUpdates[0].value).toEqual(1100);
        expect(sheetsUpdates[0].backgroundColor).toEqual('#00FF00');
        expect(sheetsUpdates[1].sheetTitle).toEqual('2024');
        expect(sheetsUpdates[1].cell).toEqual('H2');
        expect(sheetsUpdates[1].value).toEqual(1100);
        spreadSheetId = spreadSheet.id;
    })

    it('build a spreadsheet and update 3 rents', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();

        const { startDate, endDate } = getStartAndEnDatesFromRents([{ ...rent2024_02 }, { ...rent2024_03 }, { ...rent2024_04 }]);
        const { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, [{ ...estate1 }], startDate, endDate);
        const sheetsUpdates = getSpreadSheetRentsCells(mockedGoogleWorker, spreadSheet, [{ ...rent2024_02 }, { ...rent2024_03 }, { ...rent2024_04 }]);
        expect(sheetsUpdates[0].sheetTitle).toEqual('2024');
        expect(sheetsUpdates[0].cell).toEqual('G2');
        expect(sheetsUpdates[0].value).toEqual(1100);
        expect(sheetsUpdates[0].backgroundColor).toEqual('#00FF00');
        expect(sheetsUpdates[1].sheetTitle).toEqual('2024');
        expect(sheetsUpdates[1].cell).toEqual('H2');
        expect(sheetsUpdates[1].value).toEqual(1100);
        expect(sheetsUpdates[1].sheetTitle).toEqual('2024');
        expect(sheetsUpdates[2].cell).toEqual('I2');
        expect(sheetsUpdates[2].value).toEqual(1100);
        spreadSheetId = spreadSheet.id;
    })


    it('build a spreadsheet and update 2 rents in 2 differents estates', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();

        const rents = [{ ...rent2024_02, estate_id: '1' }, { ...rent2024_02, estate_id: '2' }];

        const { startDate, endDate } = getStartAndEnDatesFromRents(rents);
        const { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, [{ ...estate1, ...estate2 }], startDate, endDate);
        const sheetsUpdates = getSpreadSheetRentsCells(mockedGoogleWorker, spreadSheet, rents);

    })

})