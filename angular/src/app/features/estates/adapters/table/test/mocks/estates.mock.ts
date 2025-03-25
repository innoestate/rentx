import { Estate } from "src/app/core/models/estate.model";
import { lodger1Mock, lodger2Mock } from "./lodgers.mock";
import { owner1Mock, owner2Mock } from "./owners.mock";

export const estate1Mock: Estate = {
  id: 'estate1',
  street: '123 Elm Street',
  city: 'Springfield',
  zip: '12345',
  plot: 'Plot A',
  rent: 1200,
  charges: 200,
  owner_id: 'owner1',
  lodger_id: 'lodger1',
  address: '123 Elm Street',
  plot_address: 'Plot A',
  owner: owner1Mock,
  lodger: lodger1Mock,
  rents: [{ year: 2025, month: 2, rent: 1200 }],
  actualMonthPaid: true,
  rentReceiptSentByEmail: false,
};

export const estate2Mock: Estate = {
  id: 'estate2',
  street: '456 Oak Avenue',
  city: 'Metropolis',
  zip: '67890',
  plot: 'Plot B',
  rent: 1500,
  charges: 250,
  owner_id: 'owner2',
  lodger_id: 'lodger2',
  address: '456 Oak Avenue',
  plot_address: 'Plot B',
  owner: owner2Mock,
  lodger: lodger2Mock,
  rents: [{ year: 2025, month: 2, rent: 1500 }],
  actualMonthPaid: false,
  rentReceiptSentByEmail: true,
};
