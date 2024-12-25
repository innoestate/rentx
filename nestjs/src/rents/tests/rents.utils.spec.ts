import { Rent_Db } from "../rents.db";
import { getStartAndEnDatesFromRents } from "../rents.utils";
import { rent2021_01, rent2021_02 } from "./rents.mocks";

describe('testing geting start and end date from rents', () => {

    it('should return no unusedEstates', () => {

        const rents: Rent_Db[] = [];
        const { startDate, endDate } = getStartAndEnDatesFromRents(rents);
        expect(startDate).toBeNull();
        expect(endDate).toBeNull();

    })

    it('should return correct start and end dates', () => {

        const rents: Rent_Db[] = [{...rent2021_01}, {...rent2021_02}];
        expect(getStartAndEnDatesFromRents(rents).startDate).toEqual(rents[0].start_date);
        expect(getStartAndEnDatesFromRents(rents).endDate).toEqual(rents[1].end_date);

    })  

    it('should return correct start and end dates with inversed rents', () => {

        const rents: Rent_Db[] = [{...rent2021_01, end_date: new Date('2025-01-01')},{...rent2021_02, start_date: new Date('2020-01-01')}];
        expect(getStartAndEnDatesFromRents(rents).startDate).toEqual(rents[1].start_date);
        expect(getStartAndEnDatesFromRents(rents).endDate).toEqual(rents[0].end_date);

    }) 

})