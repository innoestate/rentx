import { Injectable } from "@angular/core";
import { LodgersDataService } from "../data/lodgers.data.service";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { CreateLodgerPopupComponent } from "src/app/lodgers/popups/create-lodger-popup/create-lodger-popup.component";
import { Estate } from "../../estates/models/estate.model";
import { Lodger_Post } from "src/app/core/models/requests/lodger-post-request.model";
import { take, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LodgersCommandsService {

    constructor(private lodgersDataService: LodgersDataService, private popupService: UiPopupService) {
      console.log('lodgers commands service constructor');
    }

    createLodger(estate?: Estate) {
      this.popupService.openPopup(CreateLodgerPopupComponent, 'Ajouter un locataire', { estate, onCreateLodger: (lodger: Lodger_Post, successCallback: () => void) => {

        this.lodgersDataService.createLodger(lodger).pipe(
          take(1),
          tap(() => successCallback())
        ).subscribe();

      }});
    }

    deleteLodger(lodgerId: string) {
      this.lodgersDataService.deleteLodger(lodgerId);
    }

}
