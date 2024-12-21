import { Rent_Db } from "./rents.db";
import { getStartAndEnDatesFromRents } from "./rents.utils";

describe('testing geting start and end date from rents', () => {

    const rent1: Rent_Db = {
        id: '1',
        estate_id: '1',
        user_id: 'A',
        lodger_id: 'B',
        start_date: new Date('2021-01-01'),
        end_date: new Date('2021-01-31'),
        rent: 100,
        charges: 10,
        created_at: new Date(),
        updated_at: new Date()
    }
    const rent2: Rent_Db = {
        id: '2',
        estate_id: '1',
        user_id: 'A',
        lodger_id: 'B',
        start_date: new Date('2021-02-01'),
        end_date: new Date('2021-02-28'),
        rent: 100,
        charges: 10,
        created_at: new Date(),
        updated_at: new Date()
    }

    it('should return no unusedEstates', () => {

        const rents: Rent_Db[] = [];
        const { startDate, endDate } = getStartAndEnDatesFromRents(rents);
        expect(startDate).toBeNull();
        expect(endDate).toBeNull();

    })

    it('should return correct start and end dates', () => {

        const rents: Rent_Db[] = [{...rent1}, {...rent2}];
        expect(getStartAndEnDatesFromRents(rents).startDate).toEqual(rents[0].start_date);
        expect(getStartAndEnDatesFromRents(rents).endDate).toEqual(rents[1].end_date);

    })  

    it('should return correct start and end dates with inversed rents', () => {

        const rents: Rent_Db[] = [{...rent1, end_date: new Date('2025-01-01')},{...rent2, start_date: new Date('2020-01-01')}];
        expect(getStartAndEnDatesFromRents(rents).startDate).toEqual(rents[1].start_date);
        expect(getStartAndEnDatesFromRents(rents).endDate).toEqual(rents[0].end_date);

    }) 

})