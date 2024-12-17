import { MockedGoogleSpreadSheetStrategy } from './spreadsheets.mocked.strategy';
import { buildSpreadsheetContext } from './rents.spreadsheet.buisness';

describe('building spreadsheet context with correct sheets numbers', () => {

    let mockedGoogleWorker: MockedGoogleSpreadSheetStrategy;
    let spreadSheetId: string;

    it('build a spreadsheet for a year from a not existing', async () => {
        const mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();
        const {spreadSheet} = await buildSpreadsheetContext(mockedGoogleWorker, null, [], new Date('2024-02-01'), new Date('2024-02-29'));
        expect(spreadSheet.sheets.length).toBe(1);
        expect(spreadSheet.sheets[0].title).toBe('2024');
    })

    it('build a spreadsheet for 2 years from a not existing', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();
        const {spreadSheet} = await buildSpreadsheetContext(mockedGoogleWorker, null, [], new Date('2023-11-01'), new Date('2024-02-29'));
        expect(spreadSheet.sheets.length).toBe(2);
        expect(spreadSheet.sheets[0].title).toBe('2023');
        expect(spreadSheet.sheets[1].title).toBe('2024');
        spreadSheetId = spreadSheet.id;
    })

    it('get the spreadsheet context from an existing spreadsheet id', async () => {
        const {spreadSheet}  = await buildSpreadsheetContext(mockedGoogleWorker, spreadSheetId, [], new Date('2023-11-01'), new Date('2024-02-29'));
        expect(spreadSheet.sheets.length).toBe(2);
        expect(spreadSheet.sheets[0].title).toBe('2023');
        expect(spreadSheet.sheets[1].title).toBe('2024');
    })

    it('get a spreadsheet context from an existing spreadsheet id with new years', async () => {
        const {spreadSheet} = await buildSpreadsheetContext(mockedGoogleWorker, spreadSheetId, [], new Date('2020-11-01'), new Date('2024-02-29'));
        expect(spreadSheet.sheets.length).toBe(5);
        expect(spreadSheet.sheets.find( sheet => sheet.title === '2020').title).toBe('2020');
        expect(spreadSheet.sheets.find( sheet => sheet.title === '2021').title).toBe('2021');
        expect(spreadSheet.sheets.find( sheet => sheet.title === '2022').title).toBe('2022');
        expect(spreadSheet.sheets.find( sheet => sheet.title === '2023').title).toBe('2023');
        expect(spreadSheet.sheets.find( sheet => sheet.title === '2024').title).toBe('2024');
    })

    it('get a spreadsheet context from an existing spreadsheet id with new years', async () => {
        const {spreadSheet} = await buildSpreadsheetContext(mockedGoogleWorker, spreadSheetId, [], new Date('2025-01-01'), new Date('2025-12-01'));
        expect(spreadSheet.sheets.length).toBe(6);
        expect(spreadSheet.sheets.find( sheet => sheet.title === '2020').title).toBe('2020');
        expect(spreadSheet.sheets.find( sheet => sheet.title === '2025').title).toBe('2025');
    })

})