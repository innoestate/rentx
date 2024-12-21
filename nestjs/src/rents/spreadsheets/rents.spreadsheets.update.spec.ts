import { Estate_filled_Db } from '../../estates/estate-filled-db.model';
import { MockedGoogleSpreadSheetStrategy } from './spreadsheets.mocked.strategy';
import { buildSpreadsheetContext, buildSpreadSheetRents } from './rents.spreadsheets.business';
import { Rent_Db } from '../rents.db';
import { getStartAndEnDatesFromRents } from '../rents.utils';
import exp from 'constants';

const estate: Estate_filled_Db = {
    id: '0',
    user_id: '1',
    owner: {
        id: '1',
        user_id: '1',
        name: 'Elon Musk',
        street: '1 rue de lespace',
        city: 'Paris',
        zip: 'Z7',
        signature: '1234',
        email: '1234',
        phone: '1234',
    },
    lodger: {
        id: '2',
        user_id: '1',
        email: '1234',
        name: 'Jeff Bezos',
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-29'),
    },
    street: '1 rue de lespace',
    city: 'Paris',
    zip: 'Z7',
}
const estates = [estate];

const rent1: Rent_Db = {
    id: '1',
    estate_id: '0',
    user_id: '1',
    lodger_id: '1',
    start_date: new Date('2024-02-01'),
    end_date: new Date('2024-02-29'),
    rent: 1000,
    charges: 100,
    created_at: new Date('2024-02-01'),
    updated_at: new Date('2024-02-01'),
}
const rent2: Rent_Db = {
    id: '2',
    estate_id: '0',
    user_id: '1',
    lodger_id: '1',
    start_date: new Date('2024-03-01'),
    end_date: new Date('2024-03-31'),
    rent: 1000,
    charges: 100,
    created_at: new Date('2024-03-01'),
    updated_at: new Date('2024-03-01'),
}
const rent3: Rent_Db = {
    id: '3',
    estate_id: '0',
    user_id: '1',
    lodger_id: '1',
    start_date: new Date('2024-04-01'),
    end_date: new Date('2024-04-30'),
    rent: 1000,
    charges: 100,
    created_at: new Date('2024-04-01'),
    updated_at: new Date('2024-04-01'),
}

describe('updating spreadsheet after building context', () => {

    let mockedGoogleWorker: MockedGoogleSpreadSheetStrategy;
    let spreadSheetId: string;

    it('build a spreadsheet and update a rent', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();
        const { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, [{ ...estate }], new Date('2024-02-01'), new Date('2024-02-29'));
        const sheetsUpdates = buildSpreadSheetRents(mockedGoogleWorker, spreadSheet, [rent1]);
        expect(sheetsUpdates[0].sheetTitle).toEqual('2024');
        expect(sheetsUpdates[0].cell).toEqual('G2');
        expect(sheetsUpdates[0].value).toEqual(1100);
        expect(sheetsUpdates[0].backgroundColor).toEqual('#00FF00');
        spreadSheetId = spreadSheet.id;
    })

    it('build a spreadsheet and update a rent', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();

        const { startDate, endDate } = getStartAndEnDatesFromRents([{ ...rent1 }, { ...rent2 }]);
        const { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, [{ ...estate }], startDate, endDate);
        const sheetsUpdates = buildSpreadSheetRents(mockedGoogleWorker, spreadSheet, [{ ...rent1 }, { ...rent2 }]);
        expect(sheetsUpdates[0].sheetTitle).toEqual('2024');
        expect(sheetsUpdates[0].cell).toEqual('G2');
        expect(sheetsUpdates[0].value).toEqual(1100);
        expect(sheetsUpdates[0].backgroundColor).toEqual('#00FF00');
        expect(sheetsUpdates[1].sheetTitle).toEqual('2024');
        expect(sheetsUpdates[1].cell).toEqual('H2');
        expect(sheetsUpdates[1].value).toEqual(1100);
        spreadSheetId = spreadSheet.id;
    })

    it('build a spreadsheet and update 3 rent', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();

        const { startDate, endDate } = getStartAndEnDatesFromRents([{ ...rent1 }, { ...rent2 }, { ...rent3 }]);
        const { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, [{ ...estate }], startDate, endDate);
        const sheetsUpdates = buildSpreadSheetRents(mockedGoogleWorker, spreadSheet, [{ ...rent1 }, { ...rent2 }, { ...rent3 }]);
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


})