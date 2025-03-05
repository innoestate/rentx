import { Injectable } from "@angular/core";
import { OwnersDataService } from "../data/owners.data.service";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { CreateOwnerPopupComponent } from "src/app/common/popups/create-owner-popup/create-owner-popup.component";
import { EditOwnerPopupComponent } from "src/app/common/popups/edit-owner-popup/edit-owner-popup.component";
import { Owner } from "src/app/core/models/owner.model";

@Injectable({
  providedIn: 'root'
})
export class OwnersCommandsService {

  constructor(private ownersDataService: OwnersDataService, private popupService: UiPopupService) {
    console.log('owners commands service constructor');
  }

  deleteOwner(ownerId: string) {
    this.ownersDataService.deleteOwner(ownerId);
  }

  createOwner(){
    return this.popupService.openPopup(CreateOwnerPopupComponent, 'Ajouter un propriétaire');
  }

  updateOwner(owner: Partial<Owner>){
    return this.popupService.openPopup(EditOwnerPopupComponent, 'éditer un propriétaire', { owner });
  }

}
