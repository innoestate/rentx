import { Prospection_Dto } from "./dtos/prospection.dto.model";

export interface Prospection extends Prospection_Dto{
  seller?: any;
  offer?: any;
  statusObject?: any
}
