import { Estate_filled_Db } from 'src/estates/estate-filled-db.model';
import { GoogleSheetWorker } from './google.sheets.buisness';
import { buildSpreadsheetContext } from './rents.spreadsheet.buisness';

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

describe('building spreadsheet context with correct columns and rows', () => {

    let mockedGoogleWorker: GoogleSheetWorker;
    let spreadSheetId: string;

    it('build a spreadsheet and check the columns', () => {
        mockedGoogleWorker = new GoogleSheetWorker();
        const spreadsheet = buildSpreadsheetContext(mockedGoogleWorker, null, estates, new Date('2024-02-01'), new Date('2024-02-29'));
        expect(spreadsheet.sheets[0].rows[0].filter(row => row.value === 'Propriétaire').length === 1).toEqual(true);
        expect(spreadsheet.sheets[0].rows[0].filter(row => row.value === 'Adresse').length === 1).toEqual(true);
        expect(spreadsheet.sheets[0].rows[0].filter(row => row.value === 'Ville').length === 1).toEqual(true);  
        expect(spreadsheet.sheets[0].rows[0].filter(row => row.value === 'Lot').length === 1).toEqual(true);
        expect(spreadsheet.sheets[0].rows[0].filter(row => row.value === 'Locataire').length === 1).toEqual(true);
        expect(spreadsheet.sheets[0].rows[0].filter(row => row.value === 'janvier').length === 1).toEqual(true);
        expect(spreadsheet.sheets[0].rows[0].filter(row => row.value === 'décembre').length === 1).toEqual(true);
        expect(spreadsheet.sheets[0].rows[1].filter(row => row.value === '1 rue de lespace').length === 1).toEqual(true);
        spreadSheetId = spreadsheet.id;
    })

    it('build a spreadsheet and check that cells matchs with columns', () => {
        const spreadsheet = buildSpreadsheetContext(mockedGoogleWorker, null, estates, new Date('2024-02-01'), new Date('2024-02-29'));
        let ownerColumn = spreadsheet.sheets[0].rows[0].findIndex(row => row.value === 'Propriétaire');
        expect(spreadsheet.sheets[0].rows[0][ownerColumn].value).toEqual('Propriétaire');
        expect(spreadsheet.sheets[0].rows[1][ownerColumn].value).toEqual('Elon Musk');
    })

    it('add years to the spreadsheet and check rows', () => {
        const spreadsheet = buildSpreadsheetContext(mockedGoogleWorker, null, estates, new Date('2023-01-01'), new Date('2023-02-29'));
        expect(spreadsheet.sheets.length).toBe(2);
        expect(spreadsheet.sheets[0].rows[1].filter(row => row.value === '1 rue de lespace').length === 1).toEqual(true);
        expect(spreadsheet.sheets[1].rows[1].filter(row => row.value === '1 rue de lespace').length === 1).toEqual(true);
    })

})