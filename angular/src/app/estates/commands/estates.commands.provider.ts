import { Injectable } from "@angular/core";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { CreateEstateCommand } from "./create.estate.command";
import { RentService } from "src/app/common/services/rents.service";
import { Estate } from "src/app/core/models/estate.model";
import { CreateLodgerComponent } from "src/app/common/components/create-lodger.component";
import { CreateLodgerPopupComponent } from "src/app/common/popups/create-lodger-popup/create-lodger-popup.component";

@Injectable({
  providedIn: 'root'
})
export class EstatesCommandsProvider {

  constructor(private popupService: UiPopupService, private rentService: RentService) {}

  createEstate(){
    return new CreateEstateCommand(this.popupService).execute();
  }

  createLodger(estate: Estate){
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
