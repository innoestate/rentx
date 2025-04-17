import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { ProspectionsDataAdapter } from "src/app/features/prospections/adapters/data/prospections.data.adapter.service";
import { ProspectionsCommandsService } from "src/app/features/prospections/commands/prospections.commands.service";
import { ProspectionsDataService } from "src/app/features/prospections/data/services/prospections.data.service";
import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";

@Injectable({
  providedIn: 'root'
})
export class DesktopProspectionsCommandsService extends ProspectionsCommandsService {

  constructor(private prospectionsDataService: ProspectionsDataService, private popupService: UiPopupService) {
    super();
    // console.log('desktop prospections commands service constructor');
  }

  override delete(id: string) {
    this.prospectionsDataService.deleteProspection(id);
  }

  override createNew(sellers: Seller_Dto[]) {
    const action = (value: any) => lastValueFrom(this.createProspection(value));
    this.popupService.openContinuableFormPopup(action, 'Ajouter un bien à la prospection test.', this.getCreateNewFormFields(sellers));
  }

  private createProspection(value: any){
    const prospectionDto = ProspectionsDataAdapter.formatToDto(value);
    return this.prospectionsDataService.createProspection(prospectionDto)
  }

}
