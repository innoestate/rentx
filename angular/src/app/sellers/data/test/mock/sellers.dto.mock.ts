import { Seller_Dto } from 'src/app/sellers/models/seller.dto.model';

export const mockSellers: Seller_Dto[] = [
  {
    id: '1',
    user_id: 'user1',
    name: 'Seller One',
    email: 'sellerone@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
    zip: '12345',
    city: 'Metropolis',
    agency: 'Agency One'
  },
  {
    id: '2',
    user_id: 'user2',
    name: 'Seller Two',
    email: 'sellertwo@example.com',
    phone: '098-765-4321',
    address: '456 Elm St',
    zip: '67890',
    city: 'Gotham',
    agency: 'Agency Two'
  }
];
