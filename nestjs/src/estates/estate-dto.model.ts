export interface Estate_Dto {
    id?: string;
    user_id?: string;
    owner_id?: string;
    lodger_id?: string;
    street: string;
    city: string;
    zip: string;
    plot?: string;
    rent?: string;
    charges?: string;
    created_at?: string;
    updated_at?: string;
}