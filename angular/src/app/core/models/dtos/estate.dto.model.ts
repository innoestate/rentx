export interface Estate_Dto {
  id: string;
  street: string;
  city: string;
  zip: string;
  rent?: number;
  charges?: number;
  owner?: string;
  lodger?: string;
}