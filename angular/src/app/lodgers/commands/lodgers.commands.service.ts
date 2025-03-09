import { Injectable } from "@angular/core";
import { take, tap } from "rxjs";
import { FormContinuablePopupComponent } from "src/app/common/popups/form-continuable-popup/form-continuable-popup.component";
import { Lodger_Post } from "src/app/lodgers/models/lodger-post-request.model";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { LodgersDataService } from "../data/lodgers.data.service";

const createPopupFields = [
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
      console.log('lodgers commands service constructor');
    }

    createLodger() {

      this.popupService.openPopup(FormContinuablePopupComponent<Lodger_Post>, 'Ajouter un locataire', {
        fields: createPopupFields,
        onValidate: (createdTarget: Lodger_Post, performedActionSuccessfullCallback: () => void) => {
            this.lodgersDataService.createLodger(createdTarget).pipe(
              take(1),
              tap(() => performedActionSuccessfullCallback())
            ).subscribe();
        }
      });
    }

    deleteLodger(lodgerId: string) {
      this.lodgersDataService.deleteLodger(lodgerId);
    }

}
