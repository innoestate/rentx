import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { OwnersCommandsService } from "src/app/features/owners/commands/owners.command.service";
import { OwnersDataService } from "src/app/features/owners/data/owners.data.service";
import { Owner } from "src/app/features/owners/models/owner.model";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";


@Injectable({
  providedIn: 'root'
})
export class DesktopOwnersCommandsService extends OwnersCommandsService {

  constructor(protected ownersDataService: OwnersDataService, protected popupService: UiPopupService) {
    super();
  }

  override deleteOwner(ownerId: string) {
    this.ownersDataService.deleteOwner(ownerId);
  }

  override createOwner() {
    const title = 'Ajouter un propriétaire:';
    const action = (value: any) => lastValueFrom(this.ownersDataService.createOwner(value));
    this.popupService.openContinuableFormPopup(action, title, this.createPopupFields);
  }

  override editOwner(fullOwner: Owner) {

    const updateAction = (values: any) => lastValueFrom(this.ownersDataService.updateOwner(fullOwner.id, values));
    this.popupService.openFormPopup<Owner>(updateAction, 'éditer un propriétaire', this.createPopupFields, fullOwner);
  }

}
