import { Prospection_Dto } from "../../models/prospection.dto.model";

export class ProspectionsDataAdapter {

  static formatToDto(prospection: Partial<Prospection_Dto>): Partial<Prospection_Dto> {
    if (prospection.seller_id === '') {
      delete prospection.seller_id;
    }
    return prospection;
  }

}