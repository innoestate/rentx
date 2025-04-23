import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
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
    const action = (value: Seller_Dto) => lastValueFrom(this.sellersData.createSeller(value)) as Promise<Seller_Dto>;
    this.popupService.openContinuableFormPopup<Seller_Dto>(action, title, this.getCreateFields());

  }

  override delete(id: string) {
    this.sellersData.deleteSeller(id);
  }

}
