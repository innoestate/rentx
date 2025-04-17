import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, of, take, tap } from "rxjs";
import { Owner_Post_Request } from "src/app/features/owners/models/owner-post-request.model";
import { Owner } from "src/app/features/owners/models/owner.model";
import { getUpdatedFields } from "src/app/shared/utils/objects.utils";
import { UiFormFieldData } from "src/app/ui/components/ui-form/models/ui-form.field-data.model";
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
    // console.log('owners commands service constructor');
  }

  deleteOwner(ownerId: string) {
    this.ownersDataService.deleteOwner(ownerId);
  }

  createOwner() {
    const title = 'Ajouter un propriétaire:';
    const action = (value: any) => lastValueFrom(this.ownersDataService.createOwner(value));
    this.popupService.openContinuableFormPopup(action, title, createPopupFields);
  }

  editOwner(fullOwner: Owner) {

    const updateAction = (values: any) => lastValueFrom(this.ownersDataService.updateOwner(fullOwner.id, values));
    this.popupService.openFormPopup<Owner>(updateAction, 'éditer un propriétaire', createPopupFields, fullOwner);
  }

}
