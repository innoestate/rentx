import { Injectable } from "@angular/core";
import { OwnersDataService } from "src/app/features/owners/data/owners.data.service";
import { UiFormFieldData } from "src/app/ui/components/ui-form/models/ui-form.field-data.model";

@Injectable({
  providedIn: 'root'
})
export class EstatesCommandsService {


  createEstateFieldsDataPopup: UiFormFieldData[] = [
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
      key: 'plot',
      label: 'Parcelle',
      type: 'text',
      required: false
    },
    {
      key: 'rent',
      label: 'Loyer',
      type: 'number',
      required: false
    },
    {
      key: 'charges',
      label: 'Charges',
      type: 'number',
      required: false
    },
    {
      key: 'owner_id',
      label: 'Propriétaire',
      type: 'dropdown',
      required: true,
      dropdownItems: []
    }
    // owner_id: new FormControl(this.data.owners.length ? this.data.owners[0].id : null),
  ]

  owners = this.ownersData.getOwners();

  constructor(protected ownersData: OwnersDataService) { }

  createEstate() {}

  deleteEstate(id: string) { }

}
