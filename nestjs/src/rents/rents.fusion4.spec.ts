import exp from "constants";
import { Rent_Db } from "./rents.db";
import { fusionateRents, getRentsByMonth } from "./rents.utils";
import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { getRentReceiptInfos } from "./rent-receipts.business";

describe('test rents fusion with total rent calculation', () => {

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
        rent: 1000,
        charges: 100
    }

    it('should return 1 rent with correct total rent', () => {

        const startDate_ = new Date('2024-02-01').toISOString();
        const endDate_ = new Date('2024-02-29').toISOString();

        const { startDate, endDate, rent, charges } = getRentReceiptInfos(estate, estate.owner, estate.lodger, startDate_, endDate_);

        const rents: Rent_Db[] = [{
            id: '1234',
            estate_id: estate.id,
            lodger_id: estate.lodger.id,
            start_date: startDate,
            end_date: endDate,
            rent,
            charges: charges,
            created_at: new Date(),
            updated_at: new Date(),
        }];

        const fusionnedRents = fusionateRents(rents);

        expect(fusionnedRents.length).toBe(1);
        expect(fusionnedRents[0].totalRent).toBe(rent + charges);

        const rentsByMonth = getRentsByMonth(fusionnedRents);

        expect(rentsByMonth.length).toBe(1);
        expect(rentsByMonth[0].rents[0].totalRent).toEqual(1100);
    })


});