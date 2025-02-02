import { PropertyStatusTypes } from "./dtos/prospection.dto.model";

export interface ProspectionsFilters {
  status: PropertyStatusTypes[];
  city: string[];
  sellers: string[];
}
