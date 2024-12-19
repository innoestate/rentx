import { Rent_Db } from "./rents.db";

export const fusionateRents = (rents: Rent_Db[]): Rent_Db[] => {
    if (rents.length === 0) return [];

    rents = rents.sort((a, b) => a.start_date.getTime() - b.start_date.getTime());

    const fusionnedRents = [];
    while (rents.length > 0 ) {
        fusionnedRents.push(rents.shift());
        for(let fusion of fusionnedRents){
            rents = fusionRent(fusion, rents);
        }
    }

    const uniqueRents = fusionnedRents.filter((rent, index, self) =>
        index === self.findIndex((r) => (
            r.start_date.getTime() === rent.start_date.getTime() &&
            r.end_date.getTime() === rent.end_date.getTime() &&
            r.estate_id === rent.estate_id
        ))
    );
    return uniqueRents;
}

export const fusionRent = (rent: Rent_Db, rentsToMerge: Rent_Db[]): Rent_Db[] => {

    const rentsAfterMerge = [];
    for (let rentToMerge of rentsToMerge) {

        if(rentToMerge.start_date <= rent.end_date){
            if(rentToMerge.end_date > rent.end_date){
                rent.end_date = new Date(rentToMerge.end_date);
                rent.start_date = rentToMerge.start_date.getTime() < rent.start_date.getTime() ? rentToMerge.start_date : rent.start_date;
            }
        }else if (isOneDayDifference(rent.end_date, rentToMerge.start_date)) {
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