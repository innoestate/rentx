import { Seller_Dto } from "../../sellers/models/seller.dto.model";
import { Prospection_Dto } from "../models/prospection.dto.model";
import { Prospection } from "../models/prospection.model";

export const filledProspection = (prospectionDto: Prospection_Dto | undefined | null, sellers: Seller_Dto[]): Prospection | undefined => {
  if(prospectionDto){

    const prospection = {...prospectionDto} as Prospection;
    const seller = sellers.find(s => s.id === prospection?.seller_id);
    if(seller) {
      prospection.seller = seller;
    }
    return prospection;
  }else{
    return undefined;
  }
}