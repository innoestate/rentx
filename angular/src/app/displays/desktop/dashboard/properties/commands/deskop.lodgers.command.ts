import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { LodgersCommandsService } from "src/app/features/lodgers/commands/lodgers.commands.service";
import { LodgersDataService } from "src/app/features/lodgers/data/lodgers.data.service";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";

@Injectable({ providedIn: 'root' })
export class DesktopLodgersCommandsService extends LodgersCommandsService {

    constructor(protected lodgersDataService: LodgersDataService, protected popupService: UiPopupService) {
      super();
    }

    override createLodger() {
      const title = 'Ajouter un locataire';
      const action = (value: any) => lastValueFrom(this.lodgersDataService.createLodger(value));
      this.popupService.openContinuableFormPopup(action, title, this.createPopupFields);
    }

    override deleteLodger(lodgerId: string) {
      this.lodgersDataService.deleteLodger(lodgerId);
    }

}
