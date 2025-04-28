import { PropertyCategory } from "src/app/shared/models/property-category.model";
import { PropertyStatusTypes } from "./prospection.status.model";

export interface Prospection_Dto {
  id?: string;
  user_id: string;
  city?: string;
  zip?: string;
  address?: string;
  link?: string;
  seller_id?: string;
  status?: PropertyStatusTypes;
  price?: number;
  counter_proposal?: number;
  emission_date?: Date;
  offer_id?: string;
  construction_cost?: number;
  rents?: number;
  resume?: string;
  comment?: string;
  property_category?: PropertyCategory;
}
