import { Injectable } from "@angular/core";
import { Estate } from "src/app/estates/models/estate.model";
import { getNeededFieldsForDownloadRentReceipt } from "./rents.commands.utils";
import { UiPopupService } from "src/app/ui/popup/services/popup.service";
import { CompleteRentReceiptPopupComponent } from "src/app/common/popups/complete-rent-receipt-popup/complete-rent-receipt-popup.component";
import { combineLatest, delay, map, Observable, of, switchMap, take, tap } from "rxjs";
import { Lodger } from "src/app/core/models/lodger.model";
import { Owner } from "src/app/core/models/owner.model";
import { OwnersDataService } from "src/app/owners/data/owners.data.service";
import { LodgersDataService } from "src/app/lodgers/data/lodgers.data.service";
import { EstatesDataService } from "src/app/estates/data/esates.data.service";
import { RentsHttpService } from "../data/http/rents.http.service";

@Injectable({
  providedIn: 'root'
})
export class RentsCommandsService {

  constructor(private estatesDataService: EstatesDataService,
    private ownersDataService: OwnersDataService,
    private lodgersDataService: LodgersDataService,
    private popupService: UiPopupService,
    private rentsHttpService: RentsHttpService) {
    console.log('rents commands service constructor');
  }

  downloadRentReceipt(estateWithoutModification: Estate) {

    const ownerId = estateWithoutModification.owner?.id;
    const lodgerId = estateWithoutModification.lodger?.id;

    let fields = getNeededFieldsForDownloadRentReceipt(estateWithoutModification);
    if (fields.length > 0) {

      this.popupService.openPopup(CompleteRentReceiptPopupComponent, 'Compléter les informations pour la quittance', { fields }).pipe(
        take(1),
        switchMap(({ owner, lodger, estate }) => this.updateCompletedObjects({ ...owner, id: ownerId }, { ...estateWithoutModification, ...estate }, { ...lodger, id: lodgerId })),
        tap(estate => this.downloadRentReceiptOnBrowser(estate))
      ).subscribe();

    } else {
      this.downloadRentReceiptOnBrowser(estateWithoutModification);
    }

  }

  senRentReceiptByEmail(estate: Estate) {
    console.log('senRentReceiptByEmail', estate);
  }

  customizeRentReceipt(estate: Estate) {
    console.log('customizeRentReceipt', estate);
  }

  protected downloadRentReceiptOnBrowser(estate: Estate) {
    this.rentsHttpService.downloadRentReceipt(estate.id).pipe(
      take(1),
      tap(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quittance.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }),
    ).subscribe();
  }

  protected updateCompletedObjects(owner: Owner, estate: Estate, lodger?: Lodger): Observable<Estate> {
    let asyncUpdates: Observable<any>[] = [];
    if (owner) {
      asyncUpdates.push(this.ownersDataService.updateOwner({ ...owner, id: owner?.id! }));
    }
    if (estate) {
      asyncUpdates.push(this.estatesDataService.updateEstate({ ...estate }));
    }
    if (lodger) {
      asyncUpdates.push(this.lodgersDataService.updateLodger({ ...lodger }));
    }
    return combineLatest(asyncUpdates).pipe(
      take(1),
      delay(0),
      map(_ => estate)
    );
  }

}
