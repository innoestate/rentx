import { Rent_Db } from "../models/rents.db.model";
import { fusionateRents, getRentsByMonth } from "../rents.utils";
import { rent2024_01 } from "./rents.mocks";

describe('test fusion of rents in estates and divising it by months', () => {

    it('should return 1 rent in one month with correct total rent', () => {
        const rents: Rent_Db[] = [{...rent2024_01}];
        const fusionnedRents = fusionateRents(rents);
        const rentsByMonth = getRentsByMonth(fusionnedRents);
        expect(rentsByMonth.length).toBe(1);
        expect(rentsByMonth[0].rents[0].rent).toEqual(1100);
    })

    it('should return 2 months of rents with correct total rent', () => {
        const rents: Rent_Db[] = [{...rent2024_01, end_date: new Date('2024-02-29')}];
        const fusionnedRents = fusionateRents(rents);
        const rentsByMonth = getRentsByMonth(fusionnedRents);
        expect(rentsByMonth.length).toBe(1);
        expect(rentsByMonth[0].rents[0].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
    })

    it('should return 2 months and a half of rents with correct total rent', () => {
        const rents: Rent_Db[] = [{...rent2024_01, end_date: new Date('2024-03-15')}];
        const fusionnedRents = fusionateRents(rents);
        const rentsByMonth = getRentsByMonth(fusionnedRents, rents);
        expect(rentsByMonth.length).toBe(1);
        expect(rentsByMonth[0].rents[0].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[0].sent).toEqual(false);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[2].rent).toEqual(532);
    })

    it('should return a half and 2 months and with correct total rent', () => {
        const rents: Rent_Db[] = [{...rent2024_01, start_date: new Date('2024-01-15'), sent: true, end_date: new Date('2024-03-31')}];
        const fusionnedRents = fusionateRents(rents);
        const rentsByMonth = getRentsByMonth(fusionnedRents, rents);
        expect(rentsByMonth.length).toBe(1);
        expect(rentsByMonth[0].rents[0].rent).toEqual(568);
        expect(rentsByMonth[0].rents[0].sent).toEqual(true);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[1].sent).toEqual(true);
        expect(rentsByMonth[0].rents[2].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[2].sent).toEqual(true);
    })

});