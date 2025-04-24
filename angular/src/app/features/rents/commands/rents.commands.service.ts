import { Injectable } from "@angular/core";
import { catchError, combineLatest, delay, map, Observable, of, switchMap, take, tap } from "rxjs";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { EstatesDataService } from "src/app/features/estates/data/service/esates.data.service";
import { Estate } from "src/app/features/estates/models/estate.model";
import { LodgersDataService } from "src/app/features/lodgers/data/lodgers.data.service";
import { Lodger } from "src/app/features/lodgers/models/lodger.model";
import { OwnersDataService } from "src/app/features/owners/data/owners.data.service";
import { Owner } from "src/app/features/owners/models/owner.model";
import { CompleteRentReceiptPopupComponent } from "src/app/features/rents/popups/complete-rent-receipt-popup/complete-rent-receipt-popup.component";
import { downloadFileOnBrowser } from "src/app/shared/utils/files.utils";
import { UiButton } from "src/app/ui/components/ui-button/models/ui-buttons.model";
import { UiPopupCustomizedComponent } from "src/app/ui/components/ui-popup/ui-popup-customized/ui-popup-customized.component";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { RentsHttpService } from "../data/http/rents.http.service";
import { customizedFields, getMandatoryFieldsForDownload, getMandatoryFieldsForEmail } from "./rents.commands.utils";

@Injectable({
  providedIn: 'root'
})
export class RentsCommandsService {

  constructor(private estatesDataService: EstatesDataService,
    private ownersDataService: OwnersDataService,
    private lodgersDataService: LodgersDataService,
    private popupService: UiPopupService,
    private localizations: LocalizationsService,
    private rentsHttpService: RentsHttpService) {
    // console.log('rents commands service constructor');
  }

  downloadRentReceipt(estate: Estate, startDate?: string, endDate?: string) {
    const mandatoryFields = getMandatoryFieldsForDownload(estate);
    return this.getCompletedEstate(estate, mandatoryFields).pipe(
      take(1),
      tap(estateId => this.downloadRentReceiptOnBrowser(estateId, startDate, endDate))
    );
  }

  sendRentReceiptByEmail(estate: Estate, startDate?: string, endDate?: string) {
    const mandatoryFields = getMandatoryFieldsForEmail(estate);
    return this.getCompletedEstate(estate, mandatoryFields).pipe(
      take(1),
      tap(estateId => this.sendReceiptByEmailRequest(estateId, startDate, endDate))
    );
  }

  customizeRentReceipt(estateWithoutModification: Estate) {
    let popup: UiPopupCustomizedComponent<{ startDate: string, endDate: string }>;
    const buttons: UiButton<{ startDate: string, endDate: string }>[] = [
      {
        text: 'Télécharger',
        type: 'default',
        command: (dates) => {
          this.downloadRentReceipt(estateWithoutModification, dates.startDate, dates.endDate).pipe(
            tap(() => popup.onClose.emit()),
            catchError(err => {
              popup.loading.set(false);
              return of(null);
            })
          ).subscribe();
        }
      },
      {
        text: 'Envoyer par email',
        type: 'default',
        command: (dates) => {
          this.sendRentReceiptByEmail(estateWithoutModification, dates.startDate, dates.endDate).pipe(
            tap(() => popup.onClose.emit()),
            catchError(err => {
              popup.loading.set(false);
              return of(null);
            })
          ).subscribe();
        }
      }
    ]
    popup = this.popupService.openCustomizedPopup(this.localizations.getLocalization('rentReceipts', 'createCustomizedRentReceipt'), customizedFields, buttons);
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
      asyncUpdates.push(this.ownersDataService.updateOwner(owner?.id!, { ...owner }));
    }
    if (Object.keys(estate).length > 1) {
      asyncUpdates.push(this.estatesDataService.updateEstate(estate?.id!, { ...estate }));
    }
    if (lodger && Object.keys(lodger).length > 1) {
      asyncUpdates.push(this.lodgersDataService.updateLodger(lodger?.id!, { ...lodger }));
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
