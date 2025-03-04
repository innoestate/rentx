import { Injectable } from "@angular/core";
import { LodgersDataService } from "../data/lodgers.data.service";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { Estate } from "src/app/core/models/estate.model";
import { CreateLodgerPopupComponent } from "src/app/common/popups/create-lodger-popup/create-lodger-popup.component";

@Injectable({ providedIn: 'root' })
export class LodgersCommands {

    constructor(private lodgersDataService: LodgersDataService, private popupService: UiPopupService) { }

    createLodger(estate?: Estate) {
      this.popupService.openPopup(CreateLodgerPopupComponent, 'Ajouter un locataire', { estate });
    }

    deleteLodger(lodgerId: string) {
      this.lodgersDataService.deleteLodger(lodgerId);
    }

}
