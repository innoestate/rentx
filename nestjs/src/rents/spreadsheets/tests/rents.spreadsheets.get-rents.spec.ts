import { getStartAndEnDatesFromRents } from '../../rents.utils';
import { estate1, estate2 } from '../../tests/estates.mocks';
import { rent2021_01, rent2020_12, rent2024_02, rent2024_03, rent2024_04, rent2021_02 } from '../../tests/rents.mocks';
import { buildSpreadsheetContext } from '../rents.spreadsheets.business';
import { MockedGoogleSpreadSheetStrategy } from '../../../spreadsheets/strategies/spreadsheets.mocked.strategy';
import { getSpreadSheetRentsCells } from '../spreadsheets.utils';


describe('updating spreadsheet after building context', () => {

    let mockedGoogleWorker: MockedGoogleSpreadSheetStrategy;
    let spreadSheetId: string;

    it('build a spreadsheet and update a rent', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();
        const { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, [{ ...estate1 }], new Date('2024-02-01'), new Date('2024-02-29'));
        const sheetsUpdates = getSpreadSheetRentsCells(spreadSheet, [{ ...rent2024_02 }], [{ ...estate1 }]);
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
        const sheetsUpdates = getSpreadSheetRentsCells(spreadSheet, [{ ...rent2024_02 }, { ...rent2024_03 }], [{ ...estate1 }]);
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
        const sheetsUpdates = getSpreadSheetRentsCells(spreadSheet, [{ ...rent2024_02 }, { ...rent2024_03 }, { ...rent2024_04 }], [{ ...estate1 }]);
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
        const estates = [{ ...estate1 }, { ...estate2 }];

        const { startDate, endDate } = getStartAndEnDatesFromRents(rents);
        const { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, [...estates], startDate, endDate);
        const sheetsCells = getSpreadSheetRentsCells(spreadSheet, rents, [...estates]);
        expect(sheetsCells.length).toEqual(2);
        expect(sheetsCells[0].cell).toEqual('G2');
        expect(sheetsCells[1].cell).toEqual('G3');

    })

    it('build a spreadsheet and update 2 rents from different years', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();

        const rents = [{ ...rent2021_01 }, { ...rent2024_02 }];
        const estates = [{ ...estate1 }];

        const { startDate, endDate } = getStartAndEnDatesFromRents(rents);
        const { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, [...estates], startDate, endDate);
        const sheetsCells = getSpreadSheetRentsCells(spreadSheet, rents, [...estates]);
        expect(sheetsCells.length).toEqual(2);
        expect(sheetsCells[0].cell).toEqual('F2');
        expect(sheetsCells[0].sheetTitle).toEqual('2021');
        expect(sheetsCells[1].cell).toEqual('G2');
        expect(sheetsCells[1].sheetTitle).toEqual('2024');

    })

    it('build a spreadsheet and update 3 rents from different years in differents estates', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();

        const rents = [{ ...rent2021_01 }, { ...rent2024_02, estate_id: '2' }, { ...rent2020_12 }];
        const estates = [{ ...estate1 }, { ...estate2 }];

        const { startDate, endDate } = getStartAndEnDatesFromRents(rents);
        const { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, [...estates], startDate, endDate);
        const sheetsCells = getSpreadSheetRentsCells(spreadSheet, rents, [...estates]);
        expect(sheetsCells.length).toEqual(3);
        expect(sheetsCells[0].cell).toEqual('Q2');
        expect(sheetsCells[0].sheetTitle).toEqual('2020');
        expect(sheetsCells[1].cell).toEqual('F2');
        expect(sheetsCells[1].sheetTitle).toEqual('2021');
        expect(sheetsCells[2].cell).toEqual('G3');
        expect(sheetsCells[2].sheetTitle).toEqual('2024');
        expect(sheetsCells[2].value).toEqual(1100);

    })

    it('build a spreadsheet and update 1 rent excluding one rent out of scope', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();

        const rents = [{ ...rent2021_01 }, { ...rent2024_02, estate_id: 'OutOfScope' }];
        const estates = [{ ...estate1 }];

        const { startDate, endDate } = getStartAndEnDatesFromRents(rents);
        const { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, [...estates], startDate, endDate);
        const sheetsCells = getSpreadSheetRentsCells(spreadSheet, rents, [...estates]);
        expect(sheetsCells.length).toEqual(1);
        expect(sheetsCells[0].cell).toEqual('F2');
        expect(sheetsCells[0].sheetTitle).toEqual('2021');

    })

})