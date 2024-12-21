import { Rent_Db } from "../rents.db";
import { fusionateRents, getRentsByMonth } from "../rents.utils";
import { rent2021_01, rent2021_02, rent2023_12 } from "./rents.mocks";

describe('test rents by months', () => {

    const rent2021_01_Estate2: Rent_Db = {...rent2021_01, estate_id: '2'};

    it('should return 1 in a month', () => {
        const rents = fusionateRents([{...rent2023_12}]);
        expect(rents.length).toEqual(1);
        const rentsByMonth = getRentsByMonth(rents);
        expect(rentsByMonth.length).toEqual(1);
        expect(rentsByMonth[0].estateId).toEqual('1');
        expect(rentsByMonth[0].rents[0].year).toEqual(2020);
        expect(rentsByMonth[0].rents[0].month).toEqual(11);
    })

    it('should return 2 rents in 2 months in one estate', () => {
        const rents = fusionateRents([{...rent2021_01}, {...rent2021_02}]);
        expect(rents.length).toEqual(1);
        const rentsByMonth = getRentsByMonth(rents);
        expect(rentsByMonth[0].rents.length).toEqual(2);
        expect(rentsByMonth[0].rents[0].year).toEqual(2021);
        expect(rentsByMonth[0].rents[0].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[0].month).toEqual(0);
        expect(rentsByMonth[0].rents[1].year).toEqual(2021);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[1].month).toEqual(1);
    })

    it('should return 2 rent in 2 months in one estate between 2 years', () => {
        const rents = fusionateRents([{...rent2023_12}, {...rent2021_01}]);
        expect(rents.length).toEqual(1);
        const rentsByMonth = getRentsByMonth(rents);
        expect(rentsByMonth[0].rents.length).toEqual(2);
        expect(rentsByMonth[0].rents[0].year).toEqual(2020);
        expect(rentsByMonth[0].rents[0].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[0].month).toEqual(11);
        expect(rentsByMonth[0].rents[1].year).toEqual(2021);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[1].month).toEqual(0);
    })

    it('should return 2 rents in 2 months in one estate and one rent in one month in an other estate', () => {
        const rents = fusionateRents([{...rent2023_12}, {...rent2021_01}, {...rent2021_01_Estate2}]);
        expect(rents.length).toEqual(2);
        const rentsByMonth = getRentsByMonth(rents);
        expect(rentsByMonth[0].rents.length).toEqual(2);
        expect(rentsByMonth[1].rents[0].month).toEqual(0);
    })

    it('should return 2 rents for 2 separate months', () => {
        const rents = fusionateRents([{...rent2023_12}, {...rent2021_02}]);
        expect(rents.length).toEqual(2);
        const rentsByMonth = getRentsByMonth(rents);
        expect(rentsByMonth[0].rents.length).toEqual(2);
        expect(rentsByMonth[0].rents[0].year).toEqual(2020);
        expect(rentsByMonth[0].rents[0].month).toEqual(11);
        expect(rentsByMonth[0].rents[0].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[1].year).toEqual(2021);
        expect(rentsByMonth[0].rents[1].month).toEqual(1);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
    })

    it('should return rents in 2 estates', () => {
        const rents = fusionateRents([{...rent2023_12}, {...rent2021_01_Estate2}]);
        const rentsByMonth = getRentsByMonth(rents);
        expect(rentsByMonth[0].rents.length).toEqual(1);
        expect(rentsByMonth[0].rents[0].year).toEqual(2020);
        expect(rentsByMonth[0].rents[0].month).toEqual(11);
        expect(rentsByMonth[1].rents[0].month).toEqual(0);
    })

    it('should return 2 rents with one of a half month', () => {
        const rents = fusionateRents([{...rent2021_01, start_date: new Date('2021-01-15')}, {...rent2021_02}]);
        const rentsByMonth = getRentsByMonth(rents);
        expect(rentsByMonth[0].rents.length).toEqual(2);
        expect(rentsByMonth[0].rents[0].year).toEqual(2021);
        expect(rentsByMonth[0].rents[0].month).toEqual(0);
        expect(rentsByMonth[0].rents[0].rent).toEqual(568);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
    })

    it('should return a rent of a half month', () => {
        const rents = fusionateRents([{...rent2021_01, start_date: new Date('2021-01-15')}]);
        const rentsByMonth = getRentsByMonth(rents);
        expect(rentsByMonth[0].rents[0].rent).toEqual(568);
    })

});