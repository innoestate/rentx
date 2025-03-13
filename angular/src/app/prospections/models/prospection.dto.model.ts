import { PropertyStatusTypes, ProspectionStatus } from "./prospection.status.model";

export interface Prospection_Dto {
  id?: string;
  user_id: string;
  city?: string;
  zip?: string;
  address?: string;
  link?: string;
  seller_id?: string;
  status?: PropertyStatusTypes;
  // statusObject?: ProspectionStatus;
  price?: number;
  counter_proposal?: number;
  emission_date?: Date;
  offer_id?: string;
  construction_cost?: number;
  rents?: number;
  resume?: string;
  comment?: string;
}
