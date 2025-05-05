import { Injectable } from '@angular/core';
import { catchError, from, Observable, of, switchMap, take, tap } from 'rxjs';
import { Owner } from 'src/app/features/owners/models/owner.model';
import { Prospection } from 'src/app/features/prospections/models/prospection.model';
import { UiButton } from 'src/app/ui/components/ui-button/models/ui-buttons.model';
import { UiFormFieldData } from 'src/app/ui/components/ui-form/models/ui-form.field-data.model';
import { UiPopupCustomizedComponent } from 'src/app/ui/components/ui-popup/ui-popup-customized/ui-popup-customized.component';
import { UiMessageService } from 'src/app/ui/services/message/message.service';
import { UiPopupService } from 'src/app/ui/services/popup/popup.service';
import { OffersDataService } from '../data/services/offers.data.service';
import { generatePdf } from '../utils/offers.pdf.utils';

interface EmailFormData {
  emailBody: string;
}

@Injectable({
  providedIn: 'root'
})
export class OfferPdfCommand {
  constructor(
    private uiPopupService: UiPopupService,
    private offersDataService: OffersDataService,
    private message: UiMessageService,
  ) { }

  downloadPdf(owner: Owner, prospection: Prospection, content: string): Observable<void> {
    return this.offersDataService.downloadOffer(owner, prospection, content);
  }

  generateAndSendPdf(owner: Owner, prospection: Prospection, content: string, prospectionId: string): Observable<any> {
    return from(generatePdf(owner, prospection, content)).pipe(
      switchMap(pdfData => this.send(prospectionId, pdfData as ArrayBuffer)),
      catchError(error => {
        this.message.error('error sending offer.');
        return of(null);
      })
    )
  }

  private getEmailFormFields(): UiFormFieldData[] {
    return [
      {
        key: 'emailBody',
        label: 'Message',
        type: 'text-area',
        required: true
      }
    ];
  }

  private send(prospectionId: string, pdfData: ArrayBuffer): Observable<any> {
    const fields = this.getEmailFormFields();
    let popup: UiPopupCustomizedComponent<EmailFormData>;
    const buttons: UiButton<EmailFormData>[] = [
      {
        text: 'Send',
        type: 'success',
        command: (values: any) => {
          popup.loading.set(true);
          this.offersDataService.sendOfferByEmail(
            prospectionId,
            pdfData,
            values.emailBody
          ).pipe(
            take(1),
            tap(() => {
              popup.onClose.emit();
              popup.loading.set(false);
            }),
            catchError(() => {
              this.message.error('error sending offer.');
              popup.loading.set(false);
              return of(null);
            } )
          ).subscribe();
          return Promise.resolve();
        }
      },
      {
        text: 'Cancel',
        type: 'error',
        keepEnableOnValidForm: true,
        command: () => {
          popup.onClose.emit();
          popup.loading.set(false);
          return Promise.resolve();
        }
      }
    ];

    popup = this.uiPopupService.openCustomizedPopup<any>(
      'Envoyer par email',
      fields,
      buttons,
      { emailBody: '' }
    );

    return of(null);
  }
}
