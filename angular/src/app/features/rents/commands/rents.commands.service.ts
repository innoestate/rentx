import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, take, tap } from "rxjs";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { Estate } from "src/app/features/estates/models/estate.model";
import { downloadFileOnBrowser } from "src/app/shared/utils/files.utils";
import { UiButton } from "src/app/ui/components/ui-button/models/ui-buttons.model";
import { UiPopupCustomizedComponent } from "src/app/ui/components/ui-popup/ui-popup-customized/ui-popup-customized.component";
import { UiPopupService } from "src/app/ui/services/popup/popup.service";
import { RentsHttpService } from "../data/http/rents.http.service";
import { customizedFields, getMandatoryFieldsForDownload, getMandatoryFieldsForEmail } from "./rents.commands.utils";
import { CompleteInformationsCommandService } from "./rents.complete.commands.service";

@Injectable({
  providedIn: 'root'
})
export class RentsCommandsService {

  constructor(private popupService: UiPopupService,
    private localizations: LocalizationsService,
    private rentsHttpService: RentsHttpService,
    private completeInformationsCommand: CompleteInformationsCommandService) {
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
      return this.completeInformationsCommand.completeInformations(fields, ownerId, estateId, lodgerId).pipe(
        map(() => estateId!)
      );
    } else {
      return of(estateId!);
    }
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
