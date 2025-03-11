import { Injectable } from "@angular/core";
import { take, tap } from "rxjs";
import { Owner } from "src/app/owners/models/owner.model";
import { Owner_Post_Request } from "src/app/owners/models/owner-post-request.model";
import { getUpdatedFields } from "src/app/core/utils/objects.utils";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { OwnersDataService } from "../data/owners.data.service";
import { FormPopupFieldData } from "src/app/views/common/popups/form-popup/models/form-popup.fields-data.model";
import { FormContinuablePopupComponent } from "src/app/views/common/popups/form-continuable-popup/form-continuable-popup.component";
import { FormPopupComponent } from "src/app/views/common/popups/form-popup/form-popup.component";

const createPopupFields: FormPopupFieldData[] = [
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
    return this.popupService.openPopup(FormContinuablePopupComponent, 'Ajouter un propriétaire', {
      fields: createPopupFields,
      onValidate: (owner: Owner_Post_Request, successCallback: () => void) => {
        this.ownersDataService.createOwner(owner).pipe(
          take(1),
          tap(() => successCallback())
        ).subscribe();
      }
    });
  }

  editOwner(fullOwner: Owner) {
    return this.popupService.openPopup(FormPopupComponent, 'éditer un propriétaire', {
      fields: createPopupFields,
      value: fullOwner,
      onValidate: (ownerUpdates: Owner_Post_Request, successCallback: () => void) => {

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
