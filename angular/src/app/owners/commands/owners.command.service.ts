import { Injectable } from "@angular/core";
import { take, tap } from "rxjs";
import { CreatePopupComponent, CreatePopupFieldData } from "src/app/common/popups/create-popup/create-popup.component";
import { EditOwnerPopupComponent } from "src/app/common/popups/edit-owner-popup/edit-owner-popup.component";
import { Owner } from "src/app/core/models/owner.model";
import { Owner_Post_Request } from "src/app/core/models/requests/owner-post-request.model";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { OwnersDataService } from "../data/owners.data.service";

const createPopupFields: CreatePopupFieldData[] = [
  {
    key: 'name',
    label: 'Nom',
    type: 'text',
    required: true
  },
  {
    key: 'street',
    label: 'Rue',
    type: 'text',
    required: true
  },
  {
    key: 'city',
    label: 'Ville',
    type: 'text',
    required: true
  },
  {
    key: 'zip',
    label: 'Code postal',
    type: 'text',
    required: true
  },
  {
    key: 'signature',
    label: 'Signature',
    type: 'signature',
    required: false
  }
]

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

  createOwner() {
    return this.popupService.openPopup(CreatePopupComponent, 'Ajouter un propriétaire', {
        fields: createPopupFields,
        onCreate: (owner: Owner_Post_Request, successCallback: () => void) => {
          this.ownersDataService.createOwner(owner).pipe(
            take(1),
            tap(() => successCallback())
          ).subscribe();
        }
      });
  }

  updateOwner(owner: Partial<Owner>) {
    return this.popupService.openPopup(EditOwnerPopupComponent, 'éditer un propriétaire', { owner });
  }

}
