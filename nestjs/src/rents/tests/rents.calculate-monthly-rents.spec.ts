import { calculateMonthlyRent, calculateRent } from "../rents.utils";

describe('divise rents to month rents', () => {

    it('test a simple rent', () => {
        const rent = 300;
        const charges = 30;
        const date = new Date('2024-02-01');
        const result = calculateMonthlyRent(rent, charges, date);
        expect(result[0].rent).toEqual(330);
    })

    it('test 2 rents', () => {
        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2024-02-01');
        const endDate = new Date('2024-03-31');
        const result = calculateMonthlyRent(rent, charges, dateStart, endDate);
        expect(result[0].rent).toEqual(330);
        expect(result[1].rent).toEqual(330);
    })

    it('test 2 rents between 2 years', () => {
        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2023-12-01');
        const endDate = new Date('2024-01-31');
        const result = calculateMonthlyRent(rent, charges, dateStart, endDate);
        expect(result[0].rent).toEqual(330);
        expect(result[0].month).toEqual(11);
        expect(result[1].rent).toEqual(330);
        expect(result[1].month).toEqual(0);
    })

    it('test 3 rents between 2 years', () => {
        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2023-11-01');
        const endDate = new Date('2024-01-31');
        const result = calculateMonthlyRent(rent, charges, dateStart, endDate);
        expect(result[0].rent).toEqual(330);
        expect(result[0].month).toEqual(10);
        expect(result[1].rent).toEqual(330);
        expect(result[1].month).toEqual(11);
        expect(result[2].rent).toEqual(330);
        expect(result[2].month).toEqual(0);
    })

    it('test 3 rents between 2 years', () => {
        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2023-12-01');
        const endDate = new Date('2024-02-29');
        const result = calculateMonthlyRent(rent, charges, dateStart, endDate);
        expect(result[0].rent).toEqual(330);
        expect(result[0].month).toEqual(11);
        expect(result[1].rent).toEqual(330);
        expect(result[1].month).toEqual(0);
        expect(result[2].rent).toEqual(330);
        expect(result[2].month).toEqual(1);
    })

    it('test 24 rents between 3 years', () => {
        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2022-09-01');
        const endDate = new Date('2024-08-31');
        const result = calculateMonthlyRent(rent, charges, dateStart, endDate);
        expect(result.length).toEqual(24);
        expect(result[0].rent).toEqual(330);
        expect(result[0].month).toEqual(8);
        expect(result[11].rent).toEqual(330);
        expect(result[11].month).toEqual(7);
        expect(result[23].rent).toEqual(330);
        expect(result[23].month).toEqual(7);
    })

})