import { Rent } from "./rent.model";

export interface EstateRents {
  estateId: string,
  rents: Rent[]
}
