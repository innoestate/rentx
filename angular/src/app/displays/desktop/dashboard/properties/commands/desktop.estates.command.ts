import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { EstatesCommandsService } from "src/app/features/estates/commands/estates.commands.service";
import { EstatesDataService } from "src/app/features/estates/data/service/esates.data.service";
import { Estate } from "src/app/features/estates/models/estate.model";
import { OwnersDataService } from "src/app/features/owners/data/owners.data.service";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";

@Injectable({
  providedIn: 'root'
})
export class DesktopEstatesCommandsService extends EstatesCommandsService {

  constructor(private estatesData: EstatesDataService,
    protected override ownersData: OwnersDataService,
    private popupService: UiPopupService,
    private localization: LocalizationsService) {
      super(ownersData);
    }

  override createEstate() {
    this.createEstateFieldsDataPopup[6] = {
      ...this.createEstateFieldsDataPopup[6],
      dropdownItems: this.owners().map(owner => ({ label: owner.name, value: owner.id }))
    }
    const action = (values: Partial<Estate>) => lastValueFrom(this.estatesData.createEstate(values));
    this.popupService.openContinuableFormPopup<Estate>(action, this.localization.getLocalization('estates', 'create'), this.createEstateFieldsDataPopup);
  }

  override deleteEstate(id: string) {
    this.estatesData.removeEstate(id)
  }

}
