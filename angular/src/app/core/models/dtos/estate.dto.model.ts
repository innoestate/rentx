export interface Estate_Dto {
  id: string;
  street: string;
  city: string;
  zip: string;
  plot?: string;
  rent?: number;
  charges?: number;
  owner_id?: string;
  lodger_id?: string;
}
