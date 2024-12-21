import { Rent_Db } from "./rents.db";
import { fusionateRents, getRentsByMonth } from "./rents.utils";

describe('test rents by months', () => {

    const rent0Estate1: Rent_Db = {
        id: 'abcd',
        user_id: '1',
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
        user_id: '1',
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
        user_id: '1',
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
        user_id: '1',
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
        user_id: '1',
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
        user_id: '1',
        estate_id: '1',
        lodger_id: '2',
        start_date: new Date('2021-03-01'),
        end_date: new Date('2021-03-31'),
        rent: 1000,
        charges: 100,
        created_at: new Date(),
        updated_at: new Date()
    }

    it('should return 1 rent by month', () => {
        const rents = fusionateRents([{...rent0Estate1}]);
        expect(rents.length).toEqual(1);
        const rentsByMonth = getRentsByMonth(rents);
        console.log('rentsByMonth', rentsByMonth[0].rents);
        expect(rentsByMonth.length).toEqual(1);
        expect(rentsByMonth[0].estateId).toEqual('1');
        expect(rentsByMonth[0].rents[0].year).toEqual(2020);
        expect(rentsByMonth[0].rents[0].month).toEqual(11);
    })


    it('should return 2 rent by month', () => {
        const rents = fusionateRents([{...rent0Estate1}, {...rent1Estate1}]);
        expect(rents.length).toEqual(1);
        const rentsByMonth = getRentsByMonth(rents);
        console.log('rentsByMonth', rentsByMonth);
        
        expect(rentsByMonth[0].rents.length).toEqual(2);
        expect(rentsByMonth[0].rents[0].year).toEqual(2020);
        expect(rentsByMonth[0].rents[0].month).toEqual(11);
        expect(rentsByMonth[0].rents[1].year).toEqual(2021);
        expect(rentsByMonth[0].rents[1].month).toEqual(0);

    })

    it('should return 3 rent by month', () => {
        const rents = fusionateRents([{...rent0Estate1}, {...rent1Estate1}, {...rent1Estate2}]);
        expect(rents.length).toEqual(2);
        const rentsByMonth = getRentsByMonth(rents);
        
        expect(rentsByMonth[0].rents.length).toEqual(2);
        expect(rentsByMonth[1].rents[0].month).toEqual(0);
    })

    it('should return 3 rent by month', () => {
        const rents = fusionateRents([{...rent0Estate1}, {...rent2Estate1}]);
        expect(rents.length).toEqual(2);
        const rentsByMonth = getRentsByMonth(rents);
        
        expect(rentsByMonth[0].rents.length).toEqual(2);
        expect(rentsByMonth[0].rents[0].year).toEqual(2020);
        expect(rentsByMonth[0].rents[0].month).toEqual(11);
        expect(rentsByMonth[0].rents[1].year).toEqual(2021);
        expect(rentsByMonth[0].rents[1].month).toEqual(1);
    })

    it('should return rents in 2 estates', () => {
        console.log('test 4');
        const rents = fusionateRents([{...rent0Estate1}, {...rent1Estate2}]);
        const rentsByMonth = getRentsByMonth(rents);
    
        expect(rentsByMonth[0].rents.length).toEqual(1);
        expect(rentsByMonth[0].rents[0].year).toEqual(2020);
        expect(rentsByMonth[0].rents[0].month).toEqual(11);
        expect(rentsByMonth[1].rents[0].month).toEqual(0);

    })


});