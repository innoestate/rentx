import { calculateRent } from "./rent-receipts.business";

describe('rents business unit tests', () => {

    it('calculate rent for a full month with 29 days', () => {

        const rent = 300;
        const charges = 30;
        const date = new Date('2024-02-01');
        const result = calculateRent(rent, charges, date).totalRent;
        expect(result).toEqual(330);
    })

    it('calculate rent for a full month with 31 days', () => {

        const rent = 300;
        const charges = 30;
        const date = new Date('2024-03-01');
        const result = calculateRent(rent, charges, date).totalRent;
        expect(result).toEqual(330);
    })

    it('calculate rent for a month with from 1 to 29 in a 29 months days', () => {

        const rent = 300;
        const charges = 30;
        const date = new Date('2024-02-01');
        const dateEnd = new Date('2024-02-29');
        const result = calculateRent(rent, charges, date, dateEnd).totalRent;
        expect(result).toEqual(330);
    })

    it('calculate rent for a month with from 1 to 31 in a 31 months days', () => {

        const rent = 300;
        const charges = 30;
        const date = new Date('2024-03-01');
        const dateEnd = new Date('2024-03-31');
        const result = calculateRent(rent, charges, date, dateEnd).totalRent;
        expect(result).toEqual(330);
    })

    it('calculate rent for 15 days in a month of 29 days', () => {

        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2024-02-01');
        const dateEnd = new Date('2024-02-15');

        const result = calculateRent(rent, charges, dateStart, dateEnd).totalRent;
        expect(result).toEqual(171);
    })

    it('calculate rent for 15 days in a month of 31 days', () => {

        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2024-03-01');
        const dateEnd = new Date('2024-03-15');

        const result = calculateRent(rent, charges, dateStart, dateEnd).totalRent;
        expect(result).toEqual(160);
    })


    it('calculate rent for 15 days in a month of 31 days from 5th', () => {

        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2024-03-05');
        const dateEnd = new Date('2024-03-20');

        const result = calculateRent(rent, charges, dateStart, dateEnd).totalRent;
        expect(result).toEqual(160);
    })

    it('calculate rent for 15 days in a month of 31 days from 16th', () => {

        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2024-03-16');
        const dateEnd = new Date('2024-03-31');

        const result = calculateRent(rent, charges, dateStart, dateEnd).totalRent;
        expect(result).toEqual(160);
    })

    it('calculate rent for 40 days from 15th between a month of 29 days and 31 days', () => {

        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2024-02-10');
        const dateEnd = new Date('2024-03-21');

        const result = calculateRent(rent, charges, dateStart, dateEnd).totalRent;
        expect(result).toEqual(440);
    })



    it('calculate rent for days from 15th of a month of 29 to the 15th of a month of 30 days after 2 months', () => {

        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2024-02-15');
        const dateEnd = new Date('2024-04-15');

        const result = calculateRent(rent, charges, dateStart, dateEnd).totalRent;
        expect(result).toEqual(159 + 330 + 165);
    })


    it('calculate rent for days from 15th of a month of 29 to the 15th of a month of 30 days after 2 months', () => {

        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2024-02-15');
        const dateEnd = new Date('2025-03-15');

        const result = calculateRent(rent, charges, dateStart, dateEnd).totalRent;
        expect(result).toEqual(159 + 3960 + 160);
    })


    it('calculate rent for 3 full months with 31 days and ending by a month with 29 days', () => {

        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2023-12-01');
        const dateEnd = new Date('2024-02-29');
        const result = calculateRent(rent, charges, dateStart, dateEnd).totalRent;
        expect(result).toEqual(990);
    })


    it('calculate rent for 18 full months with 31 days and ending by a month with 29 days', () => {

        const rent = 300;
        const charges = 30;
        const dateStart = new Date('2023-01-01');
        const dateEnd = new Date('2024-05-31');

        const result = calculateRent(rent, charges, dateStart, dateEnd).totalRent;
        expect(result).toEqual(5610);
    })


})