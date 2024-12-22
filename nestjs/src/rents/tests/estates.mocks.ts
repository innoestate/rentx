import { Estate_filled_Db } from "src/estates/estate-filled-db.model";

export const estate1: Estate_filled_Db = {
    id: '0',
    user_id: '1',
    owner: {
        id: '1',
        user_id: '1',
        name: 'Elon Musk',
        street: '1 street JFK',
        city: 'Los Angeles',
        zip: '1234',
        signature: '1234',
        email: '1234',
        phone: '1234',
    },
    lodger: {
        id: 'L1',
        user_id: 'ABC',
        email: 'albertdupontel@factice.com',
        name: 'Albert Dupontel',
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-29'),
    },
    street: '1 rue jean',
    city: 'Paris',
    zip: '01234',
}

export const estate2: Estate_filled_Db = {
    id: '0',
    user_id: '2',
    owner: {
        id: '2',
        user_id: '2',
        name: 'Jack Ma',
        street: '2 street alibaba',
        city: 'Shanghai',
        zip: '12345',
        signature: '1234',
        email: '1234',
        phone: '1234',
    },
    lodger: {
        id: 'L2',
        user_id: 'BCD',
        email: '1234',
        name: 'Bernard Tapis',
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-29'),
    },
    street: '2 street Dr lee',
    city: 'Hangzhou',
    zip: '23456',
}

export const estate3: Estate_filled_Db = {
    id: '0',
    user_id: '3',
    owner: {
        id: '3',
        user_id: '3',
        name: 'Jeff Bezos',
        street: '3 street amazon',
        city: 'New York',
        zip: '12345',
        signature: '1234',
        email: 'jeffbezos@amazon.com',
        phone: '123 456 789',
    },
    lodger: {
        id: 'L3',
        user_id: 'EFG',
        email: '1234',
        name: 'Jeff Bezos',
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-29'),
    },
    street: '3 rue Mont Calme',
    city: 'Aix en Provence',
    zip: '34567',
}
