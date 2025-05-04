import { Injectable } from '@angular/core';
import { UiPopupService } from 'src/app/ui/services/popup/popup.service';
import { UiFormFieldData } from 'src/app/ui/components/ui-form/models/ui-form.field-data.model';
import { UiButton } from 'src/app/ui/components/ui-button/models/ui-buttons.model';
import { UiPopupCustomizedComponent } from 'src/app/ui/components/ui-popup/ui-popup-customized/ui-popup-customized.component';
import { Observable, of, take, tap } from 'rxjs';
import { OffersEmailHttpService } from '../service/offers.email.http.service';

interface EmailFormData {
  emailBody: string;
}

@Injectable({
  providedIn: 'root'
})
export class OfferSendEmailCommand {
  constructor(private uiPopupService: UiPopupService,
    private offersEmailHttpService: OffersEmailHttpService
  ) { }

  send(prospectionId: string, pdfData: ArrayBuffer): Observable<any> {
    console.log('send pdfData', pdfData);
    const fields: UiFormFieldData[] = [
      {
        key: 'emailBody',
        label: 'Email Content',
        type: 'text-area',
        required: true
      }
    ];

    let popup: UiPopupCustomizedComponent<EmailFormData>;

    const buttons: UiButton<EmailFormData>[] = [
      {
        text: 'Send',
        type: 'success',
        command: (values: any) => {
          popup.loading.set(true);
          this.offersEmailHttpService.sendOfferPdf(prospectionId, this.arrayBufferToBase64(pdfData), values.emailBody).pipe(
            tap(() => popup.onClose.emit()),
            take(1)
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
          return Promise.resolve();
        }
      }
    ];

    popup = this.uiPopupService.openCustomizedPopup<any>(
      'Send Email',
      fields,
      buttons,
      { emailBody: '' }
    );

    return of(null);
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }


}
