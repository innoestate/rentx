import { Rent_Db } from "./rents.db";

export const fusionateRents = (rents: Rent_Db[]): Rent_Db[] => {
    if(rents.length === 0) return [];

    const fusionnedRents = [rents.shift()];
    for (let rent of rents ){

        const lastRent = fusionnedRents[fusionnedRents.length - 1];

        if (isOneDayDifference(lastRent.end_date, rent.start_date)) {
            lastRent.end_date = new Date(rent.end_date);
        } else if (isOneDayDifference(lastRent.start_date, rent.end_date)) {
            lastRent.start_date = new Date(rent.start_date);
        }else{
            fusionnedRents.push(rent);

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


export const isOneDayDifference = (date1: Date, date2: Date): boolean => {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return diff <= oneDay;
}