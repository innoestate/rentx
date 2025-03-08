import { Injectable } from "@angular/core";
import { take, tap } from "rxjs";
import { Estate_Post_Request } from "src/app/estates/models/estate-post-request.model";
import { CreateDesktopEstatePopupComponent } from "src/app/estates/popups/create-estate-popup/create-estate-popup.component";
import { OwnersDataService } from "src/app/owners/data/owners.data.service";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { EstatesDataService } from "../data/esates.data.service";
import { Estate } from "../models/estate.model";

@Injectable({
  providedIn: 'root'
})
export class EstatesCommandsService {

  owners = this.ownersData.getOwners();

  constructor(private estatesData: EstatesDataService, private ownersData: OwnersDataService, private popupService: UiPopupService) {
    console.log('EstatesCommandsService constructor');
   }

  createEstate() {
    return this.popupService.openPopup(CreateDesktopEstatePopupComponent, 'Ajouter un propriétaire', {
      owners: this.owners(),
      onEstateCreated: (estate: Estate_Post_Request, successCallback: () => void) => {
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
