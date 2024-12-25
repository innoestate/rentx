import { Rent } from "../rent.model";

export interface MonthlyRents_Dto {
  estateId: string;
  rents: Rent[]
}
