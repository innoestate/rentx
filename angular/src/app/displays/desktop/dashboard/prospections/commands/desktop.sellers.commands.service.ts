import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { FormPopupFieldData } from "src/app/ui/components/ui-form/form-popup/models/form-popup.fields-data.model";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { FormContinuablePopupComponent } from "src/app/ui/components/ui-form/form-continuable-popup/form-continuable-popup.component";
import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { take, tap } from "rxjs";
import { SellersDataService } from "src/app/features/sellers/data/services/sellers.data.service";
import { SellersCommandsService } from "src/app/features/sellers/commands/table/sellers.commands.service";

@Injectable({
  providedIn: 'root'
})
export class DesktopSellersCommandsService extends SellersCommandsService {

  constructor(protected override sellersData: SellersDataService,
    protected override localizationsService: LocalizationsService,
    private popupService: UiPopupService,) {
    super(sellersData, localizationsService)
  }

  override createNew() {
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

  override delete(id: string) {
    this.sellersData.deleteSeller(id);
  }

}
