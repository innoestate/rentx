import exp from "constants";
import { Rent_Db } from "./rents.db";
import { fusionateRents } from "./rents.utils";

describe('unit test of rents fusions', () => {

    const rent0Estate1: Rent_Db = {
        id: 'abcd',
        estate_id: '1',
        lodger_id: '2',
        start_date: new Date('2020-12-01'),
        end_date: new Date('2020-12-31'),
        rent: 1000,
        charges: 100,
        created_at: new Date(),
        updated_at: new Date()
    }
    const rent1Estate1: Rent_Db = {
        id: 'abcd',
        estate_id: '1',
        lodger_id: '2',
        start_date: new Date('2021-01-01'),
        end_date: new Date('2021-01-31'),
        rent: 1000,
        charges: 100,
        created_at: new Date(),
        updated_at: new Date()
    }
    const rent1Estate2: Rent_Db = {
        id: 'abcd',
        estate_id: '2',
        lodger_id: '2',
        start_date: new Date('2021-01-01'),
        end_date: new Date('2021-01-31'),
        rent: 1000,
        charges: 100,
        created_at: new Date(),
        updated_at: new Date()
    }
    const rent1Bis: Rent_Db = {
        id: 'abcdBis',
        estate_id: '1',
        lodger_id: '2',
        start_date: new Date('2021-01-01'),
        end_date: new Date('2021-01-31'),
        rent: 1000,
        charges: 100,
        created_at: new Date(),
        updated_at: new Date()
    }
    const rent2Estate1: Rent_Db = {
        id: 'efgh',
        estate_id: '1',
        lodger_id: '2',
        start_date: new Date('2021-02-01'),
        end_date: new Date('2021-02-28'),
        rent: 1000,
        charges: 100,
        created_at: new Date(),
        updated_at: new Date()
    }
    const rent3: Rent_Db = {
        id: 'ijkl',
        estate_id: '1',
        lodger_id: '2',
        start_date: new Date('2021-03-01'),
        end_date: new Date('2021-03-31'),
        rent: 1000,
        charges: 100,
        created_at: new Date(),
        updated_at: new Date()
    }

    it('test of 2 rents in 2 differents estates', () => {
        const rents = fusionateRents([{...rent0Estate1}, {...rent1Estate2}]);
        expect(rents.length).toEqual(2);
    })

    it('should return 3 rents in 2 different estates', () => {
        const rents = fusionateRents([{...rent0Estate1}, {...rent1Estate2}, {...rent2Estate1}]);
        expect(rents.length).toEqual(3);
        expect(rents[0].start_date.toISOString()).toEqual(rent0Estate1.start_date.toISOString());
        expect(rents[1].start_date.toISOString()).toEqual(rent2Estate1.start_date.toISOString());
        expect(rents[2].start_date.toISOString()).toEqual(rent1Estate2.start_date.toISOString());


    })

    it('should return 3 rents in 2 different estates', () => {
        const rents = fusionateRents([{...rent0Estate1}, {...rent1Estate1}, {...rent1Estate2}, {...rent2Estate1}]);
        expect(rents.length).toEqual(2);
        expect(rents[0].start_date.toISOString()).toEqual(rent0Estate1.start_date.toISOString());
        expect(rents[0].end_date.toISOString()).toEqual(rent2Estate1.end_date.toISOString());
    })

});