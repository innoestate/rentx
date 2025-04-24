import { Injectable } from "@angular/core";
import { Owner } from "src/app/features/owners/models/owner.model";
import { UiFormFieldData } from "src/app/ui/components/ui-form/models/ui-form.field-data.model";

@Injectable({
  providedIn: 'root'
})
export class OwnersCommandsService {

  createPopupFields: UiFormFieldData[] = [
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
      required: false
    },
    {
      key: 'city',
      label: 'Ville',
      type: 'text',
      required: false
    },
    {
      key: 'zip',
      label: 'Code postal',
      type: 'text',
      required: false
    },
    {
      key: 'signature',
      label: 'Signature',
      type: 'signature',
      required: false
    }
  ]


  constructor() { }

  deleteOwner(ownerId: string) { }

  createOwner() { }

  editOwner(fullOwner: Owner) { }

}
