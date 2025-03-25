import { Injectable } from "@angular/core";
import { Seller_Dto } from "../../models/seller.dto.model";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { SellersDataService } from "../../data/services/sellers.data.service";
import { take, tap } from "rxjs";
import { FormContinuablePopupComponent } from "src/app/displays/common/popups/form-continuable-popup/form-continuable-popup.component";
import { FormPopupFieldData } from "src/app/displays/common/popups/form-popup/models/form-popup.fields-data.model";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";

@Injectable({
  providedIn: 'root'
})
export class SellersCommandsService {

  constructor(private popupService: UiPopupService,
    private sellersData: SellersDataService,
    private localizationsService: LocalizationsService) { }

  createNew() {
    this.popupService.openPopup(FormContinuablePopupComponent, this.localizationsService.getLocalization('sellers', 'createSellerFromTitle'), {
      fields: this.getCreateFields(),
      onValidate: (seller: Seller_Dto, successCallback: () => void) => {
        this.sellersData.createSeller(seller).pipe(
          take(1),
          tap(() => successCallback())
        ).subscribe();
      }
    });
  }

  delete(id: string) {
    this.sellersData.deleteSeller(id);
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
        key: 'address',
        label: 'Rue',
        type: 'text',
      },
      {
        key: 'city',
        label: 'Ville',
        type: 'text',
      },
      {
        key: 'zip',
        label: 'Code postal',
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
