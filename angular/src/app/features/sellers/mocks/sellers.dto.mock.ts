import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";

export const sellerMock1: Seller_Dto = {
  id: 'mock-seller-id-1',
  user_id: 'mock-user-id-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  address: '123 Elm Street',
  zip: '90210',
  city: 'Beverly Hills',
  agency: 'Agency 1'
};

export const sellerMock2: Seller_Dto = {
  id: 'mock-seller-id-2',
  user_id: 'mock-user-id-2',
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  phone: '987-654-3210',
  address: '456 Oak Avenue',
  zip: '10001',
  city: 'New York',
  agency: 'Agency 2'
};

export const sellerMock3: Seller_Dto = {
  id: 'mock-seller-id-3',
  user_id: 'mock-user-id-3',
  name: 'Alice Johnson',
  email: 'alice.johnson@example.com',
  phone: '555-123-4567',
  address: '789 Pine Road',
  zip: '30301',
  city: 'Atlanta',
  agency: 'Agency 3'
};

export const SellersMock: Seller_Dto[] = [sellerMock1, sellerMock2, sellerMock3];
