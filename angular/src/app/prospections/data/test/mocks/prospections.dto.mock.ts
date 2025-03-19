import { Prospection_Dto } from "src/app/prospections/models/prospection.dto.model";

export const ProspectionDtoMock1: Prospection_Dto = {
  id: 'mock-id-1',
  user_id: 'mock-user-id-1',
  city: 'Paris',
  zip: '75001',
  address: '123 Mock St',
  link: 'http://mock-link.com',
  seller_id: 'mock-seller-id-1',
  status: 'Unresponsive',
  price: 100000,
  counter_proposal: 95000,
  emission_date: new Date('2025-03-12'),
  offer_id: 'mock-offer-id-1',
  construction_cost: 50000,
  rents: 1000,
  resume: 'Mock property resume 1',
  comment: 'Mock property comment 1'
};

export const ProspectionDtoMock2: Prospection_Dto = {
  id: 'mock-id-2',
  user_id: 'mock-user-id-2',
  city: 'Lyon',
  zip: '69001',
  address: '456 Test Ave',
  link: 'http://test-link.com',
  seller_id: 'mock-seller-id-2',
  status: 'Contacted',
  price: 250000,
  counter_proposal: 230000,
  emission_date: new Date('2025-03-11'),
  offer_id: 'mock-offer-id-2',
  construction_cost: 120000,
  rents: 2500,
  resume: 'Mock property resume 2',
  comment: 'Mock property comment 2'
};

export const ProspectionDtoMock3: Prospection_Dto = {
  id: 'mock-id-3',
  user_id: 'mock-user-id-3',
  city: 'Marseille',
  zip: '13001',
  address: '789 Sample Blvd',
  link: 'http://sample-link.com',
  seller_id: 'mock-seller-id-3',
  status: 'Pending',
  price: 180000,
  counter_proposal: 170000,
  emission_date: new Date('2025-03-10'),
  offer_id: 'mock-offer-id-3',
  construction_cost: 85000,
  rents: 1800,
  resume: 'Mock property resume 3',
  comment: 'Mock property comment 3'
};

export const ProspectionDtoMock4: Prospection_Dto = {
  id: 'mock-id-4',
  user_id: 'mock-user-id-4',
  city: 'Toulouse',
  zip: '31000',
  address: '321 Example St',
  link: 'http://example-link.com',
  seller_id: 'mock-seller-id-4',
  status: 'Signed',
  price: 220000,
  counter_proposal: 210000,
  emission_date: new Date('2025-03-09'),
  offer_id: 'mock-offer-id-4',
  construction_cost: 105000,
  rents: 2200,
  resume: 'Mock property resume 4',
  comment: 'Mock property comment 4'
};
