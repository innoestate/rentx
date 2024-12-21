import { Rent_Db } from "./rents.db";
import { differenceInMonths } from 'date-fns';

export const getRentsByMonth = (rents: Rent_Db[]): { estateId: string, rents: { year: number, month: number, totalRent: number }[] }[] => {

    const rentsByMonth = [];
    const groupedRents = groupRentsByEstates(rents);

    for (let key of Object.keys(groupedRents)) {

        const rentsInEstate = [];
        for (let rent of groupedRents[key]) {

            let yearsInterval = rent.end_date.getFullYear() - rent.start_date.getFullYear();
            const totalMonths = differenceInMonths(rent.end_date, rent.start_date) + 1;
            const monthlyTotalRent = Math.round(rent.totalRent / totalMonths);
            const calculateTotalRent = (totalMonths <= 1 && rent.start_date.getMonth() === rent.end_date.getMonth()) ? false : true;

            for (let i = 0; i <= yearsInterval; i++) {
                const year = rent.start_date.getFullYear() + i;
                const monthStart = i === 0 ? rent.start_date.getMonth() : 0;
                const monthEnd = i === yearsInterval ? rent.end_date.getMonth() : 11;

                for (let month = monthStart; month <= monthEnd; month++) {
                    const daysOfMonth = new Date(year, month + 1, 0).getDate();
                    let daysInMonth = daysOfMonth;
                    if (year === rent.end_date.getFullYear() && month === rent.end_date.getMonth()) {
                        daysInMonth = rent.end_date.getDate();
                    } else if (year === rent.start_date.getFullYear() && month === rent.start_date.getMonth()) {
                        daysInMonth = daysOfMonth - rent.start_date.getDate() + 1;
                    }
                    rentsInEstate.push({
                        year: year,
                        month: month,
                        totalRent: calculateTotalRent ? Math.round(monthlyTotalRent * daysInMonth / daysOfMonth) : rent.totalRent
                    })
                }
            }
        }

        rentsByMonth.push({
            estateId: key,
            rents: rentsInEstate
        });

    }
    return rentsByMonth;
}

export const fusionateRents = (rents: Rent_Db[]): Rent_Db[] => {
    if (rents.length === 0) return [];

    let finalFusionedRents = [];

    const groupedRents = groupRentsByEstates(rents);

    for (let key of Object.keys(groupedRents)) {

        let rentsInEstate = [...groupedRents[key].sort((a, b) => a.start_date.getTime() - b.start_date.getTime())];

        const fusionnedRents: Rent_Db[] = [];
        if (rentsInEstate.length === 1) {
            fusionnedRents.push({ ...rentsInEstate[0], totalRent: rentsInEstate[0].rent + rentsInEstate[0].charges });
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

const groupRentsByEstates = (rents: Rent_Db[]): { [key: string]: Rent_Db[] } => {
    return rents.reduce((acc, rent) => {
        if (!acc[rent.estate_id]) {
            acc[rent.estate_id] = [];
        }
        acc[rent.estate_id].push(rent);
        return acc;
    }, {} as { [key: string]: Rent_Db[] });
}