import { Injectable } from "@angular/core";
import { OwnersDataService } from "../data/owners.data.service";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { CreateOwnerPopupComponent } from "src/app/owners/popups/create-owner-popup/create-owner-popup.component";
import { EditOwnerPopupComponent } from "src/app/common/popups/edit-owner-popup/edit-owner-popup.component";
import { Owner } from "src/app/core/models/owner.model";
import { on } from "@ngrx/store";
import { Owner_Post_Request } from "src/app/core/models/requests/owner-post-request.model";
import { take, tap } from "rxjs";

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
    return this.popupService.openPopup(CreateOwnerPopupComponent, 'Ajouter un propriétaire', {
      onCreateOwner: (owner: Owner_Post_Request, successCallback: () => void) => {
        console.log('onCreateOwner', owner);
        this.ownersDataService.createOwner(owner).pipe(
          take(1),
          tap(() => successCallback())
        ).subscribe();
      }
    });
  }

  updateOwner(owner: Partial<Owner>){
    return this.popupService.openPopup(EditOwnerPopupComponent, 'éditer un propriétaire', { owner });
  }

}
