import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { ProspectionsDataService } from "../../prospections/data/services/prospections.data.service";
import { SellersDataService } from "../../sellers/data/services/sellers.data.service";


@Injectable()
export class OffersCompleteCommand {

  constructor(protected popupService: UiPopupService,
    protected prospectionsData: ProspectionsDataService,
    protected sellersData: SellersDataService,
    protected localizationService: LocalizationsService){}



}