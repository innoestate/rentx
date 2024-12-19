import { Rent_Db } from "./rents.db";
import { fusionateRents } from "./rents.utils";

describe('unit test of rents fusions', () => {

    const rent0: Rent_Db = {
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

    const rent1: Rent_Db = {
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
    const rent2: Rent_Db = {
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

    it('test an empty rent', () => {

        const emptyRent = fusionateRents([])
        expect(emptyRent).toEqual([])
    })

    it('test a rent without fusion', () => {

        const rents = fusionateRents([{...rent1}]);
        expect(rents[0].estate_id).toEqual(rent1.estate_id);
        expect(rents[0].lodger_id).toEqual(rent1.lodger_id);

    })

    it('test a doublon of rent', () => {

        const rents = fusionateRents([{...rent1}, {...rent1Bis}]);
        expect(rents.length).toEqual(1);
        expect(rents[0].estate_id).toEqual(rent1.estate_id);
        expect(rents[0].lodger_id).toEqual(rent1.lodger_id);

    })

    it('test 2 rents without fusion', () => {

        const rents = fusionateRents([{...rent1}, {...rent3}]);
        expect(rents.length).toEqual(2);
        expect(rents[0].estate_id).toEqual(rent1.estate_id);
        expect(rents[1].estate_id).toEqual(rent3.estate_id);
        expect(rents[0].lodger_id).toEqual(rent1.lodger_id);
        expect(rents[1].lodger_id).toEqual(rent3.lodger_id);

    })


    it('test 2 rents without fusion', () => {

        const rents = fusionateRents([{...rent0}, {...rent2}]);
        expect(rents.length).toEqual(2);
        expect(rents[0].estate_id).toEqual(rent0.estate_id);
        expect(rents[1].estate_id).toEqual(rent0.estate_id);
        expect(rents[0].lodger_id).toEqual(rent2.lodger_id);
        expect(rents[1].lodger_id).toEqual(rent2.lodger_id);

    })

    it('test a fusion of 2 consecutive rents', () => {

        const rents = fusionateRents([{...rent1}, {...rent2}]);
        expect(rents.length).toEqual(1);
        expect(rents[0].estate_id).toEqual(rent1.estate_id);
        expect(rents[0].lodger_id).toEqual(rent1.lodger_id);
        expect(rents[0].start_date).toEqual(rent1.start_date);
        expect(rents[0].end_date).toEqual(rent2.end_date);

    })

    it('test a fusion of 2 consecutive rents', () => {

        const rents = fusionateRents([{...rent1}, {...rent0}]);
        expect(rents.length).toEqual(1);
        expect(rents[0].start_date).toEqual(rent0.start_date);
        expect(rents[0].end_date).toEqual(rent1.end_date);

    })

    it('test a fusion of 3 consecutive rents', () => {

        const rents = fusionateRents([{...rent1}, {...rent2}, {...rent3}]);
        expect(rents.length).toEqual(1);
        expect(rents[0].start_date).toEqual(rent1.start_date);
        expect(rents[0].end_date).toEqual(rent3.end_date);

    })

    it('test a fusion of 2 consecutive rents with one without fusion', () => {

        const rent2Bis = {...rent2, start_date: new Date('2021-02-02')};

        const rents = fusionateRents([{...rent1}, {...rent2Bis}, {...rent3}]);
        expect(rents.length).toEqual(2);
        expect(rents[0].start_date).toEqual(rent1.start_date);
        expect(rents[0].end_date).toEqual(rent1.end_date);
        expect(rents[1].start_date).toEqual(rent2Bis.start_date);
        expect(rents[1].end_date).toEqual(rent3.end_date);

    })

    it('test a fusion of 2 fusionned rents', () => {

        const rent2Bis = { ...rent2, start_date: new Date('2021-02-15') };

        const rents = fusionateRents([{ ...rent1 }, { ...rent0 }, { ...rent2Bis }, { ...rent3 }]);
        expect(rents.length).toEqual(2);
        expect(rents[0].start_date).toEqual(rent0.start_date);
        expect(rents[0].end_date).toEqual(rent1.end_date);
        expect(rents[1].start_date).toEqual(rent2Bis.start_date);
        expect(rents[1].end_date).toEqual(rent3.end_date);

    })


    it('test a fusion of 2 fusionned rents', () => {

        const rent2Bis = { ...rent2, start_date: new Date('2021-02-15') };

        const rents = fusionateRents([{ ...rent2Bis }, { ...rent3 }, { ...rent1 }, { ...rent0 }]);
        expect(rents.length).toEqual(2);
        expect(rents[0].start_date).toEqual(rent0.start_date);
        expect(rents[0].end_date).toEqual(rent1.end_date);
        expect(rents[1].start_date).toEqual(rent2Bis.start_date);
        expect(rents[1].end_date).toEqual(rent3.end_date);

    })

    it('test a fusion of 2 rents walking on together', () => {

        const rent2Bis = { ...rent2, start_date: new Date('2021-01-15') };

        const rents = fusionateRents([{ ...rent1 },{ ...rent2Bis }]);
        expect(rents.length).toEqual(1);
        expect(rents[0].start_date).toEqual(rent1.start_date);
        expect(rents[0].end_date).toEqual(rent2Bis.end_date);

    })

    it('test a fusion of 1 rent englobing the other', () => {

        const rent2Bis = { ...rent2, start_date: new Date('2019-01-15') };
        const rents = fusionateRents([{ ...rent1 },{ ...rent2Bis }]);
        expect(rents.length).toEqual(1);
        expect(rents[0].start_date).toEqual(rent2Bis.start_date);
        expect(rents[0].end_date).toEqual(rent2Bis.end_date);

    })

    it('test a fusion of 2 rent englobing the other and 2 classics', () => {

        const rent2Bis = { ...rent2, start_date: new Date('2019-01-15') };
        const rents = fusionateRents([{ ...rent1 },{...rent0},{...rent3},{ ...rent2Bis }]);
        expect(rents.length).toEqual(1);
        expect(rents[0].start_date).toEqual(rent2Bis.start_date);
        expect(rents[0].end_date).toEqual(rent3.end_date);

    })

});