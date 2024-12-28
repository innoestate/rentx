export interface Prospection_Dto {
  id?: string;
  city: string;
  address: string;
  link?: string;
  seller_id?: string;
  user_id: string;
  price: number;
  emission_date: Date;
  offer_id?: string;
  construction_cost?: number;
  rents?: any;
  resume?: string;
  comment?: string;
}
