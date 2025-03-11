import { Injectable } from "@angular/core";
import { take, tap } from "rxjs";
import { Estate_Post_Request } from "src/app/estates/models/estate-post-request.model";
import { OwnersDataService } from "src/app/owners/data/owners.data.service";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { FormContinuablePopupComponent } from "../../views/common/popups/form-continuable-popup/form-continuable-popup.component";
import { EstatesDataService } from "../data/esates.data.service";
import { Estate } from "../models/estate.model";
import { FormPopupFieldData } from "src/app/views/common/popups/form-popup/models/form-popup.fields-data.model";

const createEstateFieldsDataPopup: FormPopupFieldData[] = [
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

    return this.popupService.openPopup(FormContinuablePopupComponent, 'Ajouter un propriétaire', {
      fields: createEstateFieldsDataPopup,
      onValidate: (estate: Estate_Post_Request, successCallback: () => void) => {
        this.estatesData.createEstate(estate).pipe(
          take(1),
          tap( () => successCallback())
        ).subscribe();
      }
    });
  }

  removeEstate(estate: Estate) {
    if (!estate.id) throw new Error('Estate id is required');
    this.estatesData.removeEstate(estate.id)
  }

}
