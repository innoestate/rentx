import { Injectable } from "@angular/core";
import { take, tap } from "rxjs";
import { Owner_Post_Request } from "src/app/features/owners/models/owner-post-request.model";
import { Owner } from "src/app/features/owners/models/owner.model";
import { getUpdatedFields } from "src/app/shared/utils/objects.utils";
import { UiFormFieldData } from "src/app/ui/components/ui-form/form-popup/models/ui-form.field-data.model";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { OwnersDataService } from "../data/owners.data.service";

const createPopupFields: UiFormFieldData[] = [
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

    const title = 'Ajouter un propriétaire:';
    const popup = this.popupService.openContinuableFormPopup(title, createPopupFields);
    popup?.performOnValidation((value) => this.ownersDataService.createOwner(value));

  }

  editOwner(fullOwner: Owner) {
    return this.popupService.openFormPopup('éditer un propriétaire', {
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
