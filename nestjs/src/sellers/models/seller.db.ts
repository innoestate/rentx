export interface SellerDb {
    id: string;
    user_id: string;
    name: string;
    phone: string;
    email: string;
    address?: string;
    zip?: string;
    city?: string;
    agency?: string;
}