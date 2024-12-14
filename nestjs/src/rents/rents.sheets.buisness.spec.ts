import { Estate_filled_Db } from 'src/estates/estate-filled-db.model';
import { getRentReceiptInfos } from './rent-receipts.business';
import { getCellsUpdates } from './rents.sheets.buisness';

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
        const { startDate, endDate, rentsByMonths} = getRentReceiptInfos(estate1, estate.owner, estate.lodger,  '2024-01-01');
        const cells = getCellsUpdates(rows, estate, startDate, endDate, rentsByMonths);
        expect(cells.length).toEqual(1);
        expect(cells[0].fullRent).toEqual(1000);
        expect(cells[0].cell).toEqual('F2');
    })

    it('calculate a rent of a half month', () => {
        const estate1 = { ...estate, rent: 900, charges: 100 };
        const { startDate, endDate, rentsByMonths } = getRentReceiptInfos(estate1, estate.owner, estate.lodger,  '2024-02-01', '2024-02-15');
        const cells = getCellsUpdates(rows, estate, startDate, endDate, rentsByMonths);
        expect(cells.length).toEqual(1);
        expect(cells[0].fullRent).toEqual(517);
        expect(cells[0].cell).toEqual('G2');
    })

    it('calculate a ren for 2 months', () => {
        const estate1 = { ...estate, rent: 900, charges: 100 };
        const { startDate, endDate, rentsByMonths } = getRentReceiptInfos(estate1, estate.owner, estate.lodger,  '2024-02-01', '2024-03-31');
        const cells = getCellsUpdates(rows, estate, startDate, endDate, rentsByMonths);
        expect(cells.length).toEqual(2);
        expect(cells[0].fullRent).toEqual(1000);
        expect(cells[0].cell).toEqual('G2');
        expect(cells[1].fullRent).toEqual(1000);
        expect(cells[1].cell).toEqual('H2');
    })


    it('calculate a ren for 4 months and half', () => {
        const estate1 = { ...estate, rent: 900, charges: 100 };
        const { startDate, endDate, rentsByMonths } = getRentReceiptInfos(estate1, estate.owner, estate.lodger,  '2024-02-01', '2024-05-15');
        const cells = getCellsUpdates(rows, estate, startDate, endDate, rentsByMonths);
        expect(cells.length).toEqual(4);
        expect(cells[0].fullRent).toEqual(1000);
        expect(cells[0].cell).toEqual('G2');
        expect(cells[1].fullRent).toEqual(1000);
        expect(cells[1].cell).toEqual('H2');
        expect(cells[2].fullRent).toEqual(1000);
        expect(cells[2].cell).toEqual('I2');
        expect(cells[3].fullRent).toEqual(484);
        expect(cells[3].cell).toEqual('J2');
    })

    it('calculate a ren for 4 months and half betwenn 2 years', () => {
        const estate1 = { ...estate, rent: 900, charges: 100 };
        const { startDate, endDate, rentsByMonths } = getRentReceiptInfos(estate1, estate.owner, estate.lodger,  '2023-11-01', '2024-02-15');
        const cells = getCellsUpdates(rows, estate, startDate, endDate, rentsByMonths);
        expect(cells.length).toEqual(4);
        expect(cells[0].fullRent).toEqual(1000);
        expect(cells[0].cell).toEqual('P2');
        expect(cells[1].fullRent).toEqual(1000);
        expect(cells[1].cell).toEqual('Q2');
        expect(cells[2].fullRent).toEqual(1000);
        expect(cells[2].cell).toEqual('F2');
        expect(cells[3].fullRent).toEqual(517);
        expect(cells[3].cell).toEqual('G2');
    })

})