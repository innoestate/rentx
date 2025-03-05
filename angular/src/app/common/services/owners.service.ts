import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Estate } from "src/app/core/models/estate.model";
import { Owner } from "src/app/core/models/owner.model";
import { downloadRentReceipt } from "src/app/rents/data/ngrx/rents.actions";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { EditOwnerPopupComponent } from "../popups/edit-owner-popup/edit-owner-popup.component";

@Injectable({
  providedIn: 'root',
})
export class OwnerService {

  constructor(private store: Store, private popupService: UiPopupService, private actions$: Actions) {}


  protected sendDownloadRentReceiptRequest(estate: Estate) {
    this.store.dispatch(downloadRentReceipt({ estateId: estate.id }));
  }

  openCreateOwnerPopup(owner?: Owner) {
    this.popupService.openPopup(EditOwnerPopupComponent, 'Ajouter un nouveau locataire', { owner });
    // this.modalService.create({
    //   nzTitle: 'Ajouter un nouveau locataire',
    //   nzContent: EditOwnerPopupComponent,
    //   nzData: { owner },
    //   nzFooter: null
    // });
  }

}
