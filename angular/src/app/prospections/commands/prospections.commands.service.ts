import { Injectable } from "@angular/core";
import { FormContinuablePopupComponent } from "src/app/common/popups/form-continuable-popup/form-continuable-popup.component";
import { FormPopupFieldData } from "src/app/common/popups/form-popup/models/form-popup.fields-data.model";
import { Seller_Dto } from "src/app/sellers/models/seller.dto.model";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { ProspectionsDataService } from "../data/service/prospections.data.service";
import { Prospection_Dto } from "../models/prospection.dto.model";

@Injectable({
  providedIn: 'root'
})
export class ProspectionsCommandsService {

  constructor(private prospectionsDataService: ProspectionsDataService, private popupService: UiPopupService) { }

  delete(id: string) {
    this.prospectionsDataService.deleteProspection(id);
  }

  createNew(sellers: Seller_Dto[]) {
    this.popupService.openPopup(FormContinuablePopupComponent, 'Ajouter un bien à la prospection.', {
      fields: this.getCreateNewFields(sellers),
      onValidate: ((prospection: Prospection_Dto) => {
        console.log('prospection', prospection)
        this.prospectionsDataService.createProspection(prospection);
      })
    })
  }

  private getCreateNewFields(sellers: Seller_Dto[]): FormPopupFieldData[] {
    return [
      {
        key: 'address',
        label: 'rue',
        type: 'text'
      },
      {
        key: 'city',
        label: 'Ville',
        type: 'text'
      },
      {
        key: 'zip',
        label: 'Code postal',
        type: 'text'
      },
      {
        key: 'link',
        label: 'lien',
        type: 'text'
      },
      {
        key: 'seller_id',
        label: 'Vendeur',
        type: 'dropdown',
        dropdownItems: sellers.map((seller) => ({ value: seller.id, label: seller.name }))
      }
    ]
  }

}
