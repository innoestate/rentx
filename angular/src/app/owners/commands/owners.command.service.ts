import { Injectable } from "@angular/core";
import { take, tap } from "rxjs";
import { CreatePopupComponent, CreatePopupFieldData } from "src/app/common/popups/create-popup/create-popup.component";
import { Owner } from "src/app/core/models/owner.model";
import { Owner_Post_Request } from "src/app/core/models/requests/owner-post-request.model";
import { getUpdatedFields } from "src/app/core/utils/objects.utils";
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

  editOwner(fullOwner: Owner) {
    return this.popupService.openPopup(CreatePopupComponent, 'éditer un propriétaire', {
      fields: createPopupFields,
      value: fullOwner,
      onCreate: (ownerUpdates: Owner_Post_Request, successCallback: () => void) => {

        const updatedFields: Partial<Owner> = getUpdatedFields(fullOwner, ownerUpdates);
        updatedFields.id = fullOwner.id;

        this.ownersDataService.updateOwner(updatedFields).pipe(
          take(1),
          tap(() => successCallback())
        ).subscribe();
      }
    })
  }

}
