import { fusionateRents } from "../rents.utils";
import { rent2020_12, rent2021_01, rent2021_02, rent2021_03 } from "./rents.mocks";

describe('test dates after a fusion of rents', () => {

    it('test an empty rent', () => {
        const emptyRent = fusionateRents([])
        expect(emptyRent).toEqual([])
    })

    it('test a rent without fusion', () => {
        const rents = fusionateRents([{...rent2021_01}]);
        expect(rents[0].estate_id).toEqual(rent2021_01.estate_id);
        expect(rents[0].lodger_id).toEqual(rent2021_01.lodger_id);
    })

    it('test a doublon of rent', () => {
        const rents = fusionateRents([{...rent2021_01}, {...rent2021_01}]);
        expect(rents.length).toEqual(1);
        expect(rents[0].estate_id).toEqual(rent2021_01.estate_id);
        expect(rents[0].lodger_id).toEqual(rent2021_01.lodger_id);
        expect(rents[0].rent).toEqual(1000);
    })

    it('test 2 rents without fusion', () => {
        const rents = fusionateRents([{...rent2021_01}, {...rent2021_03}]);
        expect(rents.length).toEqual(2);
        expect(rents[0].estate_id).toEqual(rent2021_01.estate_id);
        expect(rents[1].estate_id).toEqual(rent2021_03.estate_id);
        expect(rents[0].lodger_id).toEqual(rent2021_01.lodger_id);
        expect(rents[1].lodger_id).toEqual(rent2021_03.lodger_id);
    })


    it('test 2 rents without fusion', () => {
        const rents = fusionateRents([{...rent2020_12}, {...rent2021_02}]);
        expect(rents.length).toEqual(2);
        expect(rents[0].estate_id).toEqual(rent2020_12.estate_id);
        expect(rents[1].estate_id).toEqual(rent2020_12.estate_id);
        expect(rents[0].lodger_id).toEqual(rent2021_02.lodger_id);
        expect(rents[1].lodger_id).toEqual(rent2021_02.lodger_id);
    })

    it('test a fusion of 2 consecutive rents', () => {
        const rents = fusionateRents([{...rent2021_01}, {...rent2021_02}]);
        expect(rents.length).toEqual(1);
        expect(rents[0].estate_id).toEqual(rent2021_01.estate_id);
        expect(rents[0].lodger_id).toEqual(rent2021_01.lodger_id);
        expect(rents[0].start_date).toEqual(rent2021_01.start_date);
        expect(rents[0].end_date).toEqual(rent2021_02.end_date);
        expect(rents[0].totalRent).toEqual(2200);
    })

    it('test a fusion of 2 consecutive rents', () => {
        const rents = fusionateRents([{...rent2021_01}, {...rent2020_12}]);
        expect(rents.length).toEqual(1);
        expect(rents[0].start_date).toEqual(rent2020_12.start_date);
        expect(rents[0].end_date).toEqual(rent2021_01.end_date);
    })

    it('test a fusion of 3 consecutive rents', () => {
        const rents = fusionateRents([{...rent2021_01}, {...rent2021_02}, {...rent2021_03}]);
        expect(rents.length).toEqual(1);
        expect(rents[0].start_date).toEqual(rent2021_01.start_date);
        expect(rents[0].end_date).toEqual(rent2021_03.end_date);
    })

    it('test a fusion of 2 consecutive rents with one without fusion', () => {
        const rent2Bis = {...rent2021_02, start_date: new Date('2021-02-02')};
        const rents = fusionateRents([{...rent2021_01}, {...rent2Bis}, {...rent2021_03}]);
        expect(rents.length).toEqual(2);
        expect(rents[0].start_date).toEqual(rent2021_01.start_date);
        expect(rents[0].end_date).toEqual(rent2021_01.end_date);
        expect(rents[1].start_date).toEqual(rent2Bis.start_date);
        expect(rents[1].end_date).toEqual(rent2021_03.end_date);
    })

    it('test a fusion of 2 fusionned rents', () => {
        const rent2Bis = { ...rent2021_02, start_date: new Date('2021-02-15') };
        const rents = fusionateRents([{ ...rent2021_01 }, { ...rent2020_12 }, { ...rent2Bis }, { ...rent2021_03 }]);
        expect(rents.length).toEqual(2);
        expect(rents[0].start_date).toEqual(rent2020_12.start_date);
        expect(rents[0].end_date).toEqual(rent2021_01.end_date);
        expect(rents[1].start_date).toEqual(rent2Bis.start_date);
        expect(rents[1].end_date).toEqual(rent2021_03.end_date);
    })

    it('test a fusion of 2 fusionned rents', () => {
        const rent2Bis = { ...rent2021_02, start_date: new Date('2021-02-15') };
        const rents = fusionateRents([{ ...rent2Bis }, { ...rent2021_03 }, { ...rent2021_01 }, { ...rent2020_12 }]);
        expect(rents.length).toEqual(2);
        expect(rents[0].start_date).toEqual(rent2020_12.start_date);
        expect(rents[0].end_date).toEqual(rent2021_01.end_date);
        expect(rents[1].start_date).toEqual(rent2Bis.start_date);
        expect(rents[1].end_date).toEqual(rent2021_03.end_date);
    })

    it('test a fusion of 2 rents walking on together', () => {
        const rent2Bis = { ...rent2021_02, start_date: new Date('2021-01-15') };
        const rents = fusionateRents([{ ...rent2021_01 },{ ...rent2Bis }]);
        expect(rents.length).toEqual(1);
        expect(rents[0].start_date).toEqual(rent2021_01.start_date);
        expect(rents[0].end_date).toEqual(rent2Bis.end_date);
    })

    it('test a fusion of 1 rent englobing the other', () => {
        const rent2Bis = { ...rent2021_02, start_date: new Date('2019-01-15') };
        const rents = fusionateRents([{ ...rent2021_01 },{ ...rent2Bis }]);
        expect(rents.length).toEqual(1);
        expect(rents[0].start_date).toEqual(rent2Bis.start_date);
        expect(rents[0].end_date).toEqual(rent2Bis.end_date);
    })

    it('test a fusion of 2 rent englobing the other and 2 classics', () => {
        const rent2Bis = { ...rent2021_02, start_date: new Date('2019-01-15') };
        const rents = fusionateRents([{ ...rent2021_01 },{...rent2020_12},{...rent2021_03},{ ...rent2Bis }]);
        expect(rents.length).toEqual(1);
        expect(rents[0].start_date).toEqual(rent2Bis.start_date);
        expect(rents[0].end_date).toEqual(rent2021_03.end_date);
    })

});