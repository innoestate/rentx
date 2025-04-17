import { Injectable } from "@angular/core";
import { lastValueFrom, take, tap } from "rxjs";
import { Lodger_Post } from "src/app/features/lodgers/models/lodger-post-request.model";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { LodgersDataService } from "../data/lodgers.data.service";
import { UiFormFieldData } from "src/app/ui/components/ui-form/models/ui-form.field-data.model";

const createPopupFields: UiFormFieldData[] = [
  {
    key: 'name',
    label: 'Nom et prénom',
    type: 'text',
    required: true
  },
  {
    key: 'email',
    label: 'Email',
    type: 'text',
    required: false
  }
]

@Injectable({ providedIn: 'root' })
export class LodgersCommandsService {

    constructor(private lodgersDataService: LodgersDataService, private popupService: UiPopupService) {
      // console.log('lodgers commands service constructor');
    }

    createLodger() {

      const title = 'Ajouter un locataire';
      const action = (value: any) => lastValueFrom(this.lodgersDataService.createLodger(value));
      this.popupService.openContinuableFormPopup(action, title, createPopupFields);
    }

    deleteLodger(lodgerId: string) {
      this.lodgersDataService.deleteLodger(lodgerId);
    }

}
