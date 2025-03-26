import { Injectable } from "@angular/core";
import { take, tap } from "rxjs";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { SellersCommandsService } from "src/app/features/sellers/commands/table/sellers.commands.service";
import { SellersDataService } from "src/app/features/sellers/data/services/sellers.data.service";
import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";

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

    const title = this.localizationsService.getLocalization('sellers', 'createSellerFromTitle');
    const popup = this.popupService.openContinuableFormPopup(title, this.getCreateFields());
    popup?.performOnValidation((value) => this.sellersData.createSeller(value));

  }

  override delete(id: string) {
    this.sellersData.deleteSeller(id);
  }

}
