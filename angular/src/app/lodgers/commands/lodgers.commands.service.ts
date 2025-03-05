import { Injectable } from "@angular/core";
import { LodgersDataService } from "../data/lodgers.data.service";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { CreateLodgerPopupComponent } from "src/app/common/popups/create-lodger-popup/create-lodger-popup.component";
import { Estate } from "../../estates/models/estate.model";

@Injectable({ providedIn: 'root' })
export class LodgersCommandsService {

    constructor(private lodgersDataService: LodgersDataService, private popupService: UiPopupService) {
      console.log('lodgers commands service constructor');
    }

    createLodger(estate?: Estate) {
      this.popupService.openPopup(CreateLodgerPopupComponent, 'Ajouter un locataire', { estate });
    }

    deleteLodger(lodgerId: string) {
      this.lodgersDataService.deleteLodger(lodgerId);
    }

}
