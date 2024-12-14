import { Estate_filled_Db } from 'src/estates/estate-filled-db.model';
import { MockedGoogleSpreadSheetStrategy } from './spreadsheets.mocked.strategy';
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

    let mockedGoogleWorker: MockedGoogleSpreadSheetStrategy;
    let spreadSheetId: string;

    it('build a spreadsheet and check the columns', async () => {
        mockedGoogleWorker = new MockedGoogleSpreadSheetStrategy();
        const spreadsheet = await buildSpreadsheetContext(mockedGoogleWorker, null, estates, new Date('2024-02-01'), new Date('2024-02-29'));
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

    it('build a spreadsheet and check that cells matchs with columns', async () => {
        const spreadsheet = await buildSpreadsheetContext(mockedGoogleWorker, null, estates, new Date('2024-02-01'), new Date('2024-02-29'));
        let ownerColumn = spreadsheet.sheets[0].rows[0].findIndex(row => row.value === 'Propriétaire');
        expect(spreadsheet.sheets[0].rows[0][ownerColumn].value).toEqual('Propriétaire');
        expect(spreadsheet.sheets[0].rows[1][ownerColumn].value).toEqual('Elon Musk');
    })

    it('add years to the spreadsheet and check rows', async () => {
        const spreadsheet = await buildSpreadsheetContext(mockedGoogleWorker, null, estates, new Date('2023-01-01'), new Date('2023-02-29'));
        expect(spreadsheet.sheets.length).toBe(2);
        expect(spreadsheet.sheets[0].rows[1].filter(row => row.value === '1 rue de lespace').length === 1).toEqual(true);
        expect(spreadsheet.sheets[1].rows[1].filter(row => row.value === '1 rue de lespace').length === 1).toEqual(true);
    })

    it('add an estate and check rows', async () => {
        estates.push({...estate, id: '2', street: '2 rue test', owner : {...estate.owner, name: 'Bill Gates'}, lodger: {...estate.lodger, name: 'Mark Zuckerberg'}});
        const spreadsheet = await buildSpreadsheetContext(mockedGoogleWorker, null, estates, new Date('2024-01-01'), new Date('2024-02-29'));
        let streetColumnIndex = spreadsheet.sheets[0].rows[0].findIndex(row => row.value === 'Adresse');
        expect(spreadsheet.sheets[0].rows[1][streetColumnIndex].value).toEqual('1 rue de lespace');
        expect(spreadsheet.sheets[0].rows.length).toEqual(3);
        expect(spreadsheet.sheets[0].rows[2][streetColumnIndex].value).toEqual('2 rue test');
        expect(spreadsheet.sheets[1].rows.length).toEqual(3);
    })

    it('remove an estate and check rows', async () => {
        estates.pop();
        const spreadsheet = await buildSpreadsheetContext(mockedGoogleWorker, null, estates, new Date('2024-01-01'), new Date('2024-02-29'));
        expect(spreadsheet.sheets[0].rows.length).toEqual(2);
        expect(spreadsheet.sheets[1].rows.length).toEqual(2);
    })

})