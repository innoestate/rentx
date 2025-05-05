import { Injectable } from '@angular/core';
import { UiPopupService } from 'src/app/ui/services/popup/popup.service';
import { UiFormFieldData } from 'src/app/ui/components/ui-form/models/ui-form.field-data.model';
import { UiButton } from 'src/app/ui/components/ui-button/models/ui-buttons.model';
import { UiPopupCustomizedComponent } from 'src/app/ui/components/ui-popup/ui-popup-customized/ui-popup-customized.component';
import { catchError, from, Observable, of, switchMap, take, tap } from 'rxjs';
import { OffersEmailHttpService } from '../service/offers.email.http.service';
import { Owner } from 'src/app/features/owners/models/owner.model';
import { Prospection } from 'src/app/features/prospections/models/prospection.model';
import { loadImage } from 'src/app/core/utils/image.utils';
//@ts-ignore
import html2pdf from "html2pdf.js/dist/html2pdf.bundle.min.js";
import { UiMessageService } from 'src/app/ui/services/message/message.service';

interface EmailFormData {
  emailBody: string;
}

@Injectable({
  providedIn: 'root'
})
export class OfferPdfCommand {
  constructor(
    private uiPopupService: UiPopupService,
    private offersEmailHttpService: OffersEmailHttpService,
    private message: UiMessageService
  ) { }

  async generatePdf(owner: Owner, prospection: Prospection, content: string): Promise<ArrayBuffer> {
    try {
      const htmlElement = await this.buildPdfElement(owner, prospection, content);
      const options = this.getHtml2PdfOptions();

      return new Promise((resolve) => {
        html2pdf().set(options).from(htmlElement).toPdf().get('pdf').then((pdf: any) => {
          const pdfData = pdf.output('arraybuffer');
          resolve(pdfData);
        });
      });
    } catch (error) {
      this.message.error('Erreur lors de la génération du PDF');
      throw error;
    };

  }

  async downloadPdf(owner: Owner, prospection: Prospection, content: string): Promise<void> {
    const htmlElement = await this.buildPdfElement(owner, prospection, content);
    const options = this.getHtml2PdfOptions();
    html2pdf().set(options).from(htmlElement).save();
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

  send(prospectionId: string, pdfData: ArrayBuffer): Observable<any> {
    const fields = this.getEmailFormFields();

    let popup: UiPopupCustomizedComponent<EmailFormData>;

    const buttons: UiButton<EmailFormData>[] = [
      {
        text: 'Send',
        type: 'success',
        command: (values: any) => {
          popup.loading.set(true);
          this.offersEmailHttpService.sendOfferPdf(prospectionId, this.arrayBufferToBase64(pdfData), values.emailBody).pipe(
            tap(() => popup.onClose.emit()),
            tap(() => this.message.success('Email envoyé avec succès')),
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
      'Envoyer par email',
      fields,
      buttons,
      { emailBody: '' }
    );

    return of(null);
  }

  private async buildPdfElement(owner: Owner, prospection: Prospection, content: string): Promise<string> {
    try {
      const header = this.getHeader(owner, prospection);
      const footer = await this.getFooter(owner);

      return `
        <html>
          <head><title>Export PDF</title></head>
          <body>
            ${header}
            ${content}
            ${footer}
          </body>
        </html>
      `;
    } catch (err) {
      this.message.error('Erreur lors de la génération du PDF');
      throw err;
    }
  }

  private getHtml2PdfOptions() {
    return {
      margin: 10,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
  }

  private getHeader(owner: Owner, prospection: Prospection) {
    const seller = prospection.seller;

    const buildAddressBlock = (entity: any) => {
      if (!entity) return '';

      return [
        entity.name,
        entity.agency,
        entity.street || entity.address,
        entity.zip,
        entity.city,
        entity.email,
        entity.phone
      ]
      .filter(value => value)
      .join('<br>');
    };

    return `
      <table style="width: calc(100% - 20px); padding: 10px; margin-bottom: 20px; table-layout: fixed;">
        <tr>
          <td style="width: 48%; vertical-align: top; padding-right: 2%;">
            ${buildAddressBlock(owner)}
          </td>
          <td style="width: 48%; vertical-align: top; text-align: right; padding-left: 2%;">
            ${buildAddressBlock(seller)}
          </td>
        </tr>
      </table>
    `;
  }

  private async getFooter(owner: Owner): Promise<string> {
    if (owner?.signature) {
      await loadImage(owner.signature);
    }

    return `
      <div style="margin-top: 20px;">
        <div>${owner?.name}</div>
        ${owner?.signature ? `<img id="ownerSignatureImage" src="${owner.signature}" alt="Signature" style="max-height: 100px; margin-top: 10px;">` : ''}
      </div>
    `;
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

  generateAndSendPdf(owner: Owner, prospection: Prospection, content: string, prospectionId: string): Observable<any> {
    return from(this.generatePdf(owner, prospection, content)).pipe(
      switchMap(pdfData => this.send(prospectionId, pdfData as ArrayBuffer)),
      catchError(error => {
        this.message.error('error sending offer.');
        return of(null);
      })
    )
  }
}
