import { Injectable } from "@angular/core";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { CreateEstateCommand } from "./create.estate.command";

@Injectable({
  providedIn: 'root'
})
export class EstatesCommandsProvider {

  constructor(private popupService: UiPopupService) {}

  createEstate(){
    return new CreateEstateCommand(this.popupService).execute();
  }

}
