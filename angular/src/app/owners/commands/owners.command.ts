import { Injectable } from "@angular/core";
import { OwnersDataService } from "../data/owners.data.service";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { CreateOwnerPopupComponent } from "src/app/common/popups/create-owner-popup/create-owner-popup.component";

@Injectable({
  providedIn: 'root'
})
export class OwnersCommands {

  constructor(private ownersDataService: OwnersDataService, private popupService: UiPopupService) { }

  deleteOwner(ownerId: string) {
    this.ownersDataService.deleteOwner(ownerId);
  }

  createOwner(){
    return this.popupService.openPopup(CreateOwnerPopupComponent, 'Ajouter un propriétaire');
  }

}
