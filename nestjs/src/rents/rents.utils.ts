import { Rent_Db } from "./rents.db";

export const getRentsByMonth = (rents: Rent_Db[]): { estateId: string, rents: { year: number, month: number, rent: number }[] }[] => {

    console.log('rents', rents);

    const rentsByMonth = [];
    const groupedRents = groupRentsByEstates(rents);

    console.log('groupedRents', groupedRents);

    for (let key of Object.keys(groupedRents)) {

        const rentsInEstate = [];
        for (let rent of groupedRents[key]) {
    
            let yearsInterval = rent.end_date.getFullYear() - rent.start_date.getFullYear();
            for(let i = 0; i <= yearsInterval; i++) {   
                const year = rent.start_date.getFullYear() + i;
                const monthStart = i === 0 ? rent.start_date.getMonth() : 0;
                const monthEnd = i === yearsInterval ? rent.end_date.getMonth() : 11;
    
                for(let month = monthStart; month <= monthEnd; month++) {
                    rentsInEstate.push({
                        year: year,
                        month: month,
                        rent: rent.rent
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

        const fusionnedRents = [];
        if (rentsInEstate.length === 1) {
            fusionnedRents.push({ ...rentsInEstate[0] });
        } else {
            while (rentsInEstate.length > 0) {
                fusionnedRents.push(rentsInEstate.shift());
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
    return finalFusionedRents;
}

export const fusionRent = (rent: Rent_Db, rentsToMerge: Rent_Db[]): Rent_Db[] => {

    const rentsAfterMerge = [];
    for (let rentToMerge of rentsToMerge) {

        if (rentToMerge.start_date <= rent.end_date) {
            if (rentToMerge.end_date > rent.end_date) {
                rent.end_date = new Date(rentToMerge.end_date);
                rent.start_date = rentToMerge.start_date.getTime() < rent.start_date.getTime() ? rentToMerge.start_date : rent.start_date;
            }
        } else if (isOneDayDifference(rent.end_date, rentToMerge.start_date)) {
            rent.end_date = rentToMerge.end_date;
        } else if (isOneDayDifference(rentToMerge.end_date, rent.start_date)) {
            rent.start_date = rentToMerge.start_date;
        } else {
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

const groupRentsByEstates = (rents: Rent_Db[]): { [key: string]: Rent_Db[] } => {
    return rents.reduce((acc, rent) => {
        if (!acc[rent.estate_id]) {
            acc[rent.estate_id] = [];
        }
        acc[rent.estate_id].push(rent);
        return acc;
    }, {} as { [key: string]: Rent_Db[] });
}