export interface MonthlyRents {
    estateId: string;
    rents: MonthlyRent[]
}

export interface MonthlyRent {
    year: number;
    month: number;
    rent: number;
    sent: boolean;
}

