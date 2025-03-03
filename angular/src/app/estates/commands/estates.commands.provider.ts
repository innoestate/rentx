import { Injectable } from "@angular/core";
import { CreateDesktopEstatePopupComponent } from "src/app/common/popups/create-estate-popup/create-estate-popup.component";
import { CreateLodgerPopupComponent } from "src/app/common/popups/create-lodger-popup/create-lodger-popup.component";
import { RentService } from "src/app/common/services/rents.service";
import { Estate } from "src/app/core/models/estate.model";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { EstatesDataService } from "../data/esates.data.service";
import { CreateOwnerPopupComponent } from "src/app/common/popups/create-owner-popup/create-owner-popup.component";

@Injectable({
  providedIn: 'root'
})
export class EstatesCommandsProvider {

  constructor(private estatesData: EstatesDataService,private popupService: UiPopupService, private rentService: RentService) {}

  createEstate(){
    return this.popupService.openPopup(CreateDesktopEstatePopupComponent, 'Ajouter un propriétaire');
  }

  removeEstate(estate: Estate){
    this.estatesData.removeEstate(estate.id)
  }

  createOwner(){
    return this.popupService.openPopup(CreateOwnerPopupComponent, 'Ajouter un propriétaire');
  }

  createLodger(estate?: Estate){
    return this.popupService.openPopup(CreateLodgerPopupComponent, 'Ajouter un locataire', { estate });
  }

  downloadRentReceipt(estate: Estate){
    return this.rentService.downloadRentReceipt(estate)
  }

  senRentReceiptByEmail(estate: Estate){
    return this.rentService.sendRentReceiptByEmail(estate)
  }

  customizeRentReceipt(estate: Estate){
    return this.rentService.downloadCustomizedRentReceipt(estate)
  }

}
