import { Estate_filled_Db } from '../../estates/estate-filled-db.model';
import { MockedGoogleSpreadSheetStrategy } from './spreadsheets.mocked.strategy';
import { buildSpreadsheetContext, buildSpreadSheetRents } from './rents.spreadsheets.business';
import { Rent_Db } from '../rents.db';

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

describe('updating spreadsheet after building context', () => {

    let mockedGoogleWorker: MockedGoogleSpreadSheetStrategy;
    let spreadSheetId: string;

    it('build a spreadsheet and update a rent', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();
        const { spreadSheet } = await buildSpreadsheetContext(mockedGoogleWorker, null, estates, new Date('2024-02-01'), new Date('2024-02-29'));
        const sheetsUpdates = buildSpreadSheetRents(mockedGoogleWorker, spreadSheet, [rent1]);
        expect(sheetsUpdates[0].sheetId).toEqual(0);
        expect(sheetsUpdates[0].cell).toEqual('G2');
        expect(sheetsUpdates[0].backgroundColor).toEqual('#00FF00');
        spreadSheetId = spreadSheet.id;
    })


})