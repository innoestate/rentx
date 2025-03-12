import { Injectable } from "@angular/core";
import { Estate } from "src/app/estates/models/estate.model";
import { getMandatoryFieldsForDownload, getMandatoryFieldsForEmail } from "./rents.commands.utils";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { CompleteRentReceiptPopupComponent } from "src/app/rents/popups/complete-rent-receipt-popup/complete-rent-receipt-popup.component";
import { catchError, combineLatest, delay, map, Observable, of, switchMap, take, tap } from "rxjs";
import { Lodger } from "src/app/lodgers/models/lodger.model";
import { Owner } from "src/app/owners/models/owner.model";
import { OwnersDataService } from "src/app/owners/data/owners.data.service";
import { LodgersDataService } from "src/app/lodgers/data/lodgers.data.service";
import { EstatesDataService } from "src/app/estates/data/esates.data.service";
import { RentsHttpService } from "../data/http/rents.http.service";
import { downloadFileOnBrowser } from "src/app/core/utils/files.utils";
import { CreateCustomizedRentReceiptPopupComponent } from "src/app/rents/popups/create-customized-rent-receipt-popup/create-customized-rent-receipt-popup.component";

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

  downloadRentReceipt(estate: Estate, startDate?: string, endDate?: string) {
    const mandatoryFields = getMandatoryFieldsForDownload(estate);
    this.getCompletedEstate(estate, mandatoryFields).pipe(
      take(1),
      tap(estateId => this.downloadRentReceiptOnBrowser(estateId, startDate, endDate))
    ).subscribe();
  }

  senRentReceiptByEmail(estate: Estate, startDate?: string, endDate?: string) {
    const mandatoryFields = getMandatoryFieldsForEmail(estate);
    this.getCompletedEstate(estate, mandatoryFields).pipe(
      take(1),
      tap(estateId => this.sendReceiptByEmailRequest(estateId, startDate, endDate))
    ).subscribe();
  }

  customizeRentReceipt(estateWithoutModification: Estate) {
    this.popupService.openPopup(CreateCustomizedRentReceiptPopupComponent, 'Créer une quittance personnalisée', { estate: estateWithoutModification }).pipe(
      tap(({ type, startDate, endDate }) => {
        if(type === 'download') {
          this.downloadRentReceipt(estateWithoutModification, startDate, endDate);
        } else {
          this.senRentReceiptByEmail(estateWithoutModification, startDate, endDate);
        }
      })
    ).subscribe();
  }

  protected getCompletedEstate(estateWithoutModification: Estate, fields: string[]): Observable<string> {

    const estateId = estateWithoutModification.id;
    const ownerId = estateWithoutModification.owner?.id;
    const lodgerId = estateWithoutModification.lodger?.id;

    if (fields.length > 0) {

      return this.popupService.openPopup(CompleteRentReceiptPopupComponent, 'Compléter les informations pour la quittance', { fields }).pipe(
        take(1),
        switchMap(({ owner, lodger, estate }) => this.updateCompletedObjects({ ...owner, id: ownerId }, { ...estate, id: estateId }, { ...lodger, id: lodgerId })),
        map(_ => (estateId!))
      );

    } else {
      return of(estateId!);
    }
  }

  protected updateCompletedObjects(owner: Partial<Owner>, estate: Partial<Estate>, lodger?: Partial<Lodger>): Observable<boolean> {
    let asyncUpdates: Observable<any>[] = [];
    if (Object.keys(owner).length > 1) {
      asyncUpdates.push(this.ownersDataService.updateOwner({ ...owner, id: owner?.id! }));
    }
    if (Object.keys(estate).length > 1) {
      asyncUpdates.push(this.estatesDataService.updateEstate({ ...estate }));
    }
    if (lodger && Object.keys(lodger).length > 1) {
      asyncUpdates.push(this.lodgersDataService.updateLodger({ ...lodger }));
    }
    return combineLatest(asyncUpdates).pipe(
      take(1),
      delay(0),
      catchError(err => of(false)),
      map(_ => true)
    );
  }

  protected downloadRentReceiptOnBrowser(estateId: string, startDate?: string, endDate?: string) {
    this.rentsHttpService.downloadRentReceipt(estateId, startDate, endDate).pipe(
      take(1),
      tap(blob => downloadFileOnBrowser(blob, `quittance.pdf`)),
    ).subscribe();
  }

  protected sendReceiptByEmailRequest(estateId: string, startDate?: string, endDate?: string) {
    this.rentsHttpService.sendRentReceiptByEmail(estateId, startDate, endDate).pipe(
      take(1)
    ).subscribe();
  }

}
