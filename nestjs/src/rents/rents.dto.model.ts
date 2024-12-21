export interface Rent_Dto {
    user_id: string;
    estate_id: string;
    lodger_id: string;
    start_date: Date;
    end_date: Date;
    rent: number;
    charges: number;
}