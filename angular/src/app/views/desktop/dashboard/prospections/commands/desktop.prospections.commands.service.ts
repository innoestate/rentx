import { Injectable } from "@angular/core";
import { ProspectionsCommandsService } from "src/app/prospections/commands/prospections.commands.service";
import { ProspectionsDataService } from "src/app/prospections/data/service/prospections.data.service";
import { Prospection_Dto } from "src/app/prospections/models/prospection.dto.model";
import { Seller_Dto } from "src/app/sellers/models/seller.dto.model";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { FormContinuablePopupComponent } from "src/app/views/common/popups/form-continuable-popup/form-continuable-popup.component";

@Injectable({
  providedIn: 'root'
})
export class DesktopProspectionsCommandsService extends ProspectionsCommandsService{

  constructor(private prospectionsDataService: ProspectionsDataService, private popupService: UiPopupService) {
    super();
  }

  override delete(id: string) {
    this.prospectionsDataService.deleteProspection(id);
  }

  override createNew(sellers: Seller_Dto[]) {
    this.popupService.openPopup(FormContinuablePopupComponent, 'Ajouter un bien à la prospection.', {
      fields: this.getCreateNewFormFields(sellers),
      onValidate: ((prospection: Prospection_Dto) => {
        this.prospectionsDataService.createProspection(prospection);
      })
    })
  }

}
