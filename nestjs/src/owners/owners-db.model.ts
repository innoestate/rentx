export interface Owner_Db {
    id?: string;
    user_id: string;
    name: string;
    street: string;
    city: string;
    zip: string;
    signature: string;
    email: string;
    phone: string;
    created_at?: string;
    updated_at?: string;
}

export const formatOwner = (owner: any): Owner_Db => {
    return {
        user_id: owner.user_id,
        name: owner.name??'',
        street: owner.street??'',
        city: owner.city??'',
        zip: owner.zip??'',
        signature: owner.signature??'',
        email: owner.email??'',
        phone: owner.phone??'',
    }
}