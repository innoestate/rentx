export interface Rent_Db {
    id: string;
    user_id: string;
    estate_id: string;
    lodger_id: string;
    start_date: Date;
    end_date: Date;
    rent: number;
    charges: number;
    totalRent?: number;
    created_at: Date;
    updated_at: Date;
}