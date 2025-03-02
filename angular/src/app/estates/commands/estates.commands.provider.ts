import { Injectable } from "@angular/core";
import { UxPopupService } from "src/app/ux/popup/services/popup.service";
import { CreateEstateCommand } from "./create.estate.command";

@Injectable({
  providedIn: 'root'
})
export class EstatesCommandsProvider {

  constructor(private popupService: UxPopupService) {}

  createEstate(){
    return new CreateEstateCommand(this.popupService).execute();
  }

}
