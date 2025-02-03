import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { Rent_Db } from "./models/rents.db.model";
import { MonthlyRents } from "./models/monlthy-rent.model";

export const getRentsByMonth = (fusionnedRents: Rent_Db[], rentsFromDb?: Rent_Db[]): MonthlyRents[] => {

    const rentsByMonths = [];
    const groupedRents = groupRentsByEstates(fusionnedRents);

    for (let key of Object.keys(groupedRents)) {

        let rentsInEstate = [];
        for (let rent of groupedRents[key]) {
            const rentsByMonth = calculateMonthlyRent(rent.rent, rent.charges, rent.start_date, rent.end_date);
            rentsInEstate = [...rentsInEstate, ...rentsByMonth];
        }

        rentsByMonths.push({
            estateId: key,
            rents: rentsInEstate
        });
    }

    return setSentToRents(rentsByMonths, rentsFromDb);
}

export const fusionateRents = (rents: Rent_Db[], estatesScope?: Estate_filled_Db[]): Rent_Db[] => {
    if (rents.length === 0) return [];

    let finalFusionedRents = [];

    let filteredRents = [...rents];
    if (estatesScope?.length) {
        filteredRents = rents.filter(rent => estatesScope.find(estate => estate.id === rent.estate_id));
    }

    const groupedRents = groupRentsByEstates(filteredRents);

    for (let key of Object.keys(groupedRents)) {

        let rentsInEstate = [...groupedRents[key].sort((a, b) => a.start_date.getTime() - b.start_date.getTime())];

        const fusionnedRents: Rent_Db[] = [];

        if (rentsInEstate.length === 1) {
            const calculatedRent = calculateRent(rentsInEstate[0].rent, rentsInEstate[0].charges, rentsInEstate[0].start_date, rentsInEstate[0].end_date);
            fusionnedRents.push({ ...rentsInEstate[0], totalRent: calculatedRent });
        } else {
            while (rentsInEstate.length > 0) {

                const rentInEstate = rentsInEstate.shift();
                fusionnedRents.push({ ...rentInEstate, totalRent: rentInEstate.rent + rentInEstate.charges });
                for (let fusion of fusionnedRents) {
                    rentsInEstate = fusionRent(fusion, rentsInEstate);
                }
            }
        }
        rentsInEstate = fusionnedRents.filter((rent, index, self) =>
            index === self.findIndex((r) => (
                r.start_date.getTime() === rent.start_date.getTime() &&
                r.end_date.getTime() === rent.end_date.getTime() &&
                r.estate_id === rent.estate_id
            ))
        );
        finalFusionedRents = [...finalFusionedRents, ...rentsInEstate];
    }
    return finalFusionedRents.map(fusionnedRent => {

        if (fusionnedRent.start_date.getFullYear() === fusionnedRent.end_date.getFullYear()
            && Math.abs(fusionnedRent.end_date.getMonth() - fusionnedRent.start_date.getMonth()) <= 0) {

            const daysInMonth = new Date(fusionnedRent.start_date.getFullYear(), fusionnedRent.start_date.getMonth() + 1, 0).getDate();
            const daysBetweenDates = Math.abs(fusionnedRent.start_date.getDate() - fusionnedRent.end_date.getDate()) + 1;
            if (daysBetweenDates < daysInMonth) {
                fusionnedRent.totalRent = Math.round((fusionnedRent.charges + fusionnedRent.rent) * daysBetweenDates / daysInMonth)
            }

        }
        return fusionnedRent;
    });
}

export const fusionRent = (rent: Rent_Db, rentsToMerge: Rent_Db[]): Rent_Db[] => {

    const rentsAfterMerge = [];
    for (let rentToMerge of rentsToMerge) {

        if (rentToMerge.start_date <= rent.end_date) {
            if (rentToMerge.end_date > rent.end_date) {
                rent.end_date = new Date(rentToMerge.end_date);
                rent.start_date = rentToMerge.start_date.getTime() < rent.start_date.getTime() ? rentToMerge.start_date : rent.start_date;
                rent.totalRent = rent.rent + rentToMerge.rent + rent.charges + rentToMerge.charges;
            }
        } else if (isOneDayDifference(rent.end_date, rentToMerge.start_date)) {
            rent.end_date = rentToMerge.end_date;
            rent.totalRent = rent.rent + rent.charges + rentToMerge.rent + rentToMerge.charges;
        } else if (isOneDayDifference(rentToMerge.end_date, rent.start_date)) {
            rent.start_date = rentToMerge.start_date;
            rent.totalRent = rent.rent + rent.charges + rentToMerge.rent + rentToMerge.charges;
        } else {
            rentToMerge.totalRent = rentToMerge.rent + rentToMerge.charges;
            rentsAfterMerge.push(rentToMerge);
        }
    }
    return rentsAfterMerge;
}

export const isOneDayDifference = (date1: Date, date2: Date): boolean => {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return diff <= oneDay;
}

export const getStartAndEnDatesFromRents = (rents: Rent_Db[]): { startDate: Date, endDate: Date } => {
    if (rents.length === 0) return { startDate: null, endDate: null };
    const startDate = new Date(rents.map(rent => rent.start_date).sort((a, b) => a.getTime() - b.getTime())[0]);
    const endDate = new Date(rents.map(rent => rent.end_date).sort((a, b) => b.getTime() - a.getTime())[0]);

    return { startDate, endDate };
}

export const calculateRent = (rent: number, charges: number, dateStart: Date, dateEnd?: Date): number => {
    const monthlyRents = calculateMonthlyRent(rent, charges, dateStart, dateEnd);
    return monthlyRents.reduce((acc, rent) => rent.rent + acc, 0);
}

export const calculateMonthlyRent = (rent: number, charges: number, dateStart: Date, dateEnd?: Date): { year: number, month: number, rent: number }[] => {

    let rentsByMonths = [];

    if (!dateEnd) {
        return [{ month: dateStart.getMonth(), year: dateStart.getFullYear(), rent: rent + charges }];
    } else {

        const daysInFirstMonth = new Date(dateStart.getFullYear(), dateStart.getMonth() + 1, 0).getDate();
        const daysInLastMonth = new Date(dateEnd.getFullYear(), dateEnd.getMonth() + 1, 0).getDate();
        const daysOfFirstMonth = daysInFirstMonth - (dateStart.getDate() + (dateStart.getDate() == 1 ? -1 : 0));
        const daysOfLastMonth = dateEnd.getDate();

        let days = 0;
        if (dateStart.getMonth() == dateEnd.getMonth() && dateStart.getFullYear() === dateEnd.getFullYear()) {
            days = dateEnd.getDate() - (dateStart.getDate() + (dateStart.getDate() == 1 ? -1 : 0));
            const result = Math.round((rent + charges) / daysInFirstMonth * days);
            rentsByMonths.push({ month: dateStart.getMonth(), year: dateStart.getFullYear(), rent: result });
        } else {

            if (dateStart.getFullYear() == dateEnd.getFullYear()) {

                const rentForFirstMonth = Math.round((rent + charges) / daysInFirstMonth * daysOfFirstMonth);
                const rentForMonthsBetween = (rent + charges) * (dateEnd.getMonth() - dateStart.getMonth() - 1);
                const rentForLastMonth = Math.round((rent + charges) / daysInLastMonth * daysOfLastMonth);

                rentsByMonths.push({ month: dateStart.getMonth(), year: dateStart.getFullYear(), rent: rentForFirstMonth });
                if (rentForMonthsBetween) {
                    for (let i = 1; i <= dateEnd.getMonth() - dateStart.getMonth() - 1; i++) {
                        rentsByMonths.push({ month: dateStart.getMonth() + i, year: dateStart.getFullYear(), rent: rent + charges });
                    }
                }
                if (rentForLastMonth) {
                    rentsByMonths.push({ month: dateEnd.getMonth(), year: dateEnd.getFullYear(), rent: rentForLastMonth });
                }


            } else {
                const rentForFirstMonth = Math.round((rent + charges) / daysInFirstMonth * daysOfFirstMonth);
                rentsByMonths.push({ month: dateStart.getMonth(), year: dateStart.getFullYear(), rent: rentForFirstMonth });

                for (let monthsBeforeNextYears = dateStart.getMonth() + 1; monthsBeforeNextYears <= 11; monthsBeforeNextYears++) {
                    rentsByMonths.push({ month: monthsBeforeNextYears, year: dateStart.getFullYear(), rent: rent + charges });
                }
                for (let yearsBetween = dateStart.getFullYear() + 1; yearsBetween < dateEnd.getFullYear(); yearsBetween++) {
                    for (let months = 0; months <= 11; months++) {
                        rentsByMonths.push({ month: months, year: yearsBetween, rent: rent + charges });
                    }
                }
                for (let monthsAfterNextYears = 0; monthsAfterNextYears <= dateEnd.getMonth() - 1; monthsAfterNextYears++) {
                    rentsByMonths.push({ month: monthsAfterNextYears, year: dateEnd.getFullYear(), rent: rent + charges });
                }

                const rentForLastMonth = Math.round((rent + charges) / daysInLastMonth * daysOfLastMonth);
                if (rentForLastMonth) {
                    rentsByMonths.push({ month: dateEnd.getMonth(), year: dateEnd.getFullYear(), rent: rentForLastMonth });
                }
            }

        }

    }

    return rentsByMonths;
}

const groupRentsByEstates = (rents: Rent_Db[]): { [key: string]: Rent_Db[] } => {
    return rents.reduce((acc, rent) => {
        if (!acc[rent.estate_id]) {
            acc[rent.estate_id] = [];
        }
        acc[rent.estate_id].push(rent);
        return acc;
    }, {} as { [key: string]: Rent_Db[] });
}

const setSentToRents = (rentsByMonths: MonthlyRents[], rentsFromDb: Rent_Db[]): MonthlyRents[] => {
    if (rentsFromDb) {
        rentsByMonths.forEach(rentsByMonth => {
            rentsByMonth.rents = rentsByMonth.rents.map(rent => {
                const startDate = new Date(rent.year, rent.month, 1);
                const endDate = new Date(rent.year, rent.month + 1, 0);
                const sent = rentsFromDb?.find(rentFromDb => rentFromDb.estate_id === rentsByMonth.estateId
                    && rentFromDb.start_date.getTime() <= endDate.getTime()
                    && rentFromDb.end_date.getTime() >= startDate.getTime()
                    && rentFromDb.sent);
                return { ...rent, sent: !!sent };
            })
        });
    }
    return rentsByMonths;
}