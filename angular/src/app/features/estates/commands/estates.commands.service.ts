import { Injectable } from "@angular/core";
import { catchError, delay, filter, of, switchMap, take, tap } from "rxjs";
import { Estate_Post_Request } from "src/app/features/estates/models/estate-post-request.model";
import { OwnersDataService } from "src/app/features/owners/data/owners.data.service";
import { UiFormFieldData } from "src/app/ui/components/ui-form/form-popup/models/ui-form.field-data.model";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { EstatesDataService } from "../data/service/esates.data.service";
import { Estate } from "../models/estate.model";

const createEstateFieldsDataPopup: UiFormFieldData[] = [
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

@Injectable({
  providedIn: 'root'
})
export class EstatesCommandsService {

  owners = this.ownersData.getOwners();

  constructor(private estatesData: EstatesDataService, private ownersData: OwnersDataService, private popupService: UiPopupService) {
    console.log('EstatesCommandsService constructor');
  }

  createEstate() {

    createEstateFieldsDataPopup[6] = {
      ...createEstateFieldsDataPopup[6],
      dropdownItems: this.owners().map(owner => ({ label: owner.name, value: owner.id }))
    }

    const popup = this.popupService.openContinuableFormPopup('Ajouter un propriétaire', createEstateFieldsDataPopup);
    popup.performOnValidation((value) => this.estatesData.createEstate(value as any));

  }

  removeEstate(estate: Estate) {
    if (!estate.id) throw new Error('Estate id is required');
    this.estatesData.removeEstate(estate.id)
  }

}
