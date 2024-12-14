import { Estate_filled_Db } from 'src/estates/estate-filled-db.model';
import { getCellsUpdates } from './rents.sheets.buisness';
import { getRentReceiptInfos } from './rent-receipts.business';
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

describe('rents calculate rents in month to add in sheet unit tests', () => {

    it('calculate a basic rent of a month should return the correct cell in an array', () => {
        const estate1 = { ...estate, rent: 900, charges: 100 };
        const { startDate, endDate, rent, charges } = getRentReceiptInfos(estate1, estate.owner, estate.lodger,  '2024-01-01');
        const cells = getCellsUpdates(rows, estate, startDate, endDate, rent + charges);
        expect(cells.length).toEqual(1);
        expect(cells[0].fullRent).toEqual(1000);
        expect(cells[0].cell).toEqual('F2');
    })




})