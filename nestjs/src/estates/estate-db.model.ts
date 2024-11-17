export interface Estate_Db {
    id?: string;
    user_id: string;
    street: string;
    city: string;
    zip: string;
    plot: string;
    rent: number;
    charges: number;
    owner_id: number;
    lodger_id: number;
}