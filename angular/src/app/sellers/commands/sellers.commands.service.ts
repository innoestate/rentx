import { Injectable } from "@angular/core";
import { Seller_Dto } from "../models/seller.dto.model";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { FormContinuablePopupComponent } from "src/app/common/popups/form-continuable-popup/form-continuable-popup.component";
import { FormPopupFieldData } from "src/app/common/popups/form-popup/models/form-popup.fields-data.model";
import { SellersDataService } from "../data/service/sellers.data.service";
import { take, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SellersCommandsService {

  constructor(private popupService: UiPopupService, private sellersData: SellersDataService ) { }

  createNew() {
    this.popupService.openPopup(FormContinuablePopupComponent, 'créer un vendeur', {
      fields: this.getCreateFields(),
      onValidate: (seller: Seller_Dto, successCallback: () => void) => {
        this.sellersData.create(seller).pipe(
          take(1),
          tap( () => successCallback())
        ).subscribe();
      }
    });
  }

  delete(id: string) {
    this.sellersData.delete(id);
  }

  private getCreateFields(): FormPopupFieldData[] {
    return [
      {
        key: 'name',
        label: 'Nom et Prénom',
        type: 'text',
        required: true
      },
      {
        key: 'street',
        label: 'Rue',
        type: 'text',
      },
      {
        key: 'phone',
        label: 'téléphone',
        type: 'text',
      },
      {
        key: 'email',
        label: 'email',
        type: 'text',
      },
      {
        key: 'agency',
        label: 'Agence',
        type: 'text',
      },
    ]
  }
}
