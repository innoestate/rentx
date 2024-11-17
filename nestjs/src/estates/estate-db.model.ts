export interface Estate_Db {
    id?: string;
    user_id: string;
    owner_id?: string;
    lodger_id?: string;
    street: string;
    city: string;
    zip: string;
    plot?: string;
    rent?: number;
    charges?: number;
}