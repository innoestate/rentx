import { Estate_filled_Db } from 'src/estates/estate-filled-db.model';
import { GoogleSheetWorker } from './google.sheets.buisness';
import { buildSpreadsheetContext } from './rents.spreadsheet.buisness';
import exp from 'constants';

const rows = [
    [ 'Propriétaire', 'Adresse', 'Ville', 'Lot', 'Locataire'],
    [ 'Elon Musk', '1 rue de lespace', 'Paris', 'Z7', 'Jeff Bezos' ],
]

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
        email:  '1234',
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


describe('spreadsheet tests', () => {

    it('build a spreadsheet for a year from a not existing', () => {
        const mockedGoogleWorker = new GoogleSheetWorker();
        const spreadsheet = buildSpreadsheetContext(mockedGoogleWorker, null, estates, new Date('2024-02-01'), new Date('2024-02-29'));
        expect(spreadsheet).toBeDefined();
        expect(spreadsheet.sheets.length).toBe(1);
        expect(spreadsheet.sheets[0].title).toBe('2024');
    })

    it('build a spreadsheet for 2 years from a not existing', () => {
        const mockedGoogleWorker = new GoogleSheetWorker();
        const spreadsheet = buildSpreadsheetContext(mockedGoogleWorker, null, estates, new Date('2023-11-01'), new Date('2024-02-29'));
        expect(spreadsheet).toBeDefined();
        expect(spreadsheet.sheets.length).toBe(2);
        expect(spreadsheet.sheets[0].title).toBe('2023');
        expect(spreadsheet.sheets[1].title).toBe('2024');
    })
    

})