import { Injectable } from "@angular/core";
import { CreateDesktopEstatePopupComponent } from "src/app/common/popups/create-estate-popup/create-estate-popup.component";
import { CreateLodgerPopupComponent } from "src/app/common/popups/create-lodger-popup/create-lodger-popup.component";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { EstatesDataService } from "../data/esates.data.service";
import { Estate } from "../models/estate.model";

@Injectable({
  providedIn: 'root'
})
export class EstatesCommandsService {

  constructor(private estatesData: EstatesDataService, private popupService: UiPopupService) {
    console.log('EstatesCommandsService constructor');
   }

  createEstate() {
    return this.popupService.openPopup(CreateDesktopEstatePopupComponent, 'Ajouter un propriétaire');
  }

  removeEstate(estate: Estate) {
    if (!estate.id) throw new Error('Estate id is required');
    this.estatesData.removeEstate(estate.id)
  }

  createLodger(estate?: Estate) {
    return this.popupService.openPopup(CreateLodgerPopupComponent, 'Ajouter un locataire', { estate });
  }

}
