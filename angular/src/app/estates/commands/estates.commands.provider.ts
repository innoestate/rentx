import { Injectable } from "@angular/core";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { CreateEstateCommand } from "./create.estate.command";
import { RentService } from "src/app/common/services/rents.service";
import { Estate } from "src/app/core/models/estate.model";

@Injectable({
  providedIn: 'root'
})
export class EstatesCommandsProvider {

  constructor(private popupService: UiPopupService, private rentService: RentService) {}

  createEstate(){
    return new CreateEstateCommand(this.popupService).execute();
  }

  downloadRentReceipt(estate: Estate){
    return this.rentService.downloadRentReceipt(estate)
  }

}
