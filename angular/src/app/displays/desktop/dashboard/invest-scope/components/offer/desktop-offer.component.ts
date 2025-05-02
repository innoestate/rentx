import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, model, OnInit, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { QuillModule } from 'ngx-quill';
import { InvestScopeDisplayStoreFacade } from 'src/app/features/invest-scope/states/display/facades/invest-scope.display-store.facade';
import { OffersDataService } from 'src/app/features/offers/data/services/offers.data.service';
import { OfferDto } from 'src/app/features/offers/models/offer.dto.model';
import { OwnersDataService } from 'src/app/features/owners/data/owners.data.service';
import { Owner } from 'src/app/features/owners/models/owner.model';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiDropdown } from 'src/app/ui/components/ui-dropdown/model/ui-dropdown.model';
import { UiDropdownComponent } from 'src/app/ui/components/ui-dropdown/ui-dropdown.component';
import { OfferIconsComponent } from './offer-icons/offer-icons.component';

@Component({
  selector: 'app-desktop-offer',
  templateUrl: './desktop-offer.component.html',
  styleUrls: ['./desktop-offer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    QuillModule,
    NzButtonModule,
    FormsModule,
    OfferIconsComponent,
    UiDropdownComponent,
    UiButtonComponent
  ],
  providers: [
    OwnersDataService
  ]
})
export class DesktopOfferComponent extends UiDisplayerComponent implements OnInit {

  prospection = toSignal(this.investScopeStore.onSelectedItem());
  sellers = this.sellersData.getSellers();
  prospectionId = computed(() => this.prospection()?.id);
  offers: Signal<{ [prospectionId: string]: OfferDto[] }> = this.offersService.getOffers();
  prospectionOffers: Signal<OfferDto[]> = computed(() => this.offers()[this.prospectionId()!]);
  selectedOffer = model<OfferDto | null>(null);
  selectedOfferId = computed(() => this.selectedOffer()?.id ?? null);
  owners = this.ownersData.getOwners();
  ownersDropdown = this.buildOwnersDropdown();
  selectedOwner = signal<Owner | undefined>(undefined)

  editorContent: string = '';
  isEditing = false;

  constructor(
    private offersService: OffersDataService,
    private investScopeStore: InvestScopeDisplayStoreFacade,
    private ownersData: OwnersDataService,
    private sellersData: SellersDataService,
    private elementRef: ElementRef
  ) {
    super(elementRef);

    this.ownersData.loadOwners();

    this.initChangeProspectionEffect();
    this.initLoadOffersEffect();


    effect(() => {

      const owner = this.selectedOwner();
      const seller = this.prospection()?.seller;
      const selectedOffer = this.selectedOffer();

      if (owner && !selectedOffer) {
        this.createDefaultHeader(this.selectedOwner()!);
      }

    })

  }

  ngOnInit() { }

  initChangeProspectionEffect() {
    effect(() => {
      const prospectionId = this.prospectionId();
      this.selectedOffer.set(null);
      if (prospectionId) {
        this.offersService.loadProspectionOffers(prospectionId);
      }
    })
  }

  initLoadOffersEffect() {
    effect(() => {
      const offers = this.prospectionOffers();

      if (this.selectedOffer()) {

      } else if (offers?.length) {
        this.selectedOffer.set(offers[0]);
        this.editorContent = offers[0].markdown ?? '';
      } else {
        // this.createDefaultHeader();
        this.editorContent = '';
      }
    });
  }

  createDefaultHeader(owner: Owner) { }

  saveOffer() {
    if (this.selectedOfferId() === null) {
      this.offersService.createOffer({
        prospection_id: this.prospectionId()!,
        markdown: this.editorContent
      }).subscribe();
    } else {
      this.offersService.updateOffer(this.selectedOfferId()!, {
        markdown: this.editorContent
      }).subscribe();
    }
  }

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link']
    ]
  };

  exportToFormat(format: 'pdf' | 'docx' | 'markdown') {
    if (!this.editorContent) return;

    const header = this.getHeader();
    const content = this.editorContent;
    const footer = this.getFooter();

    switch (format) {
      case 'pdf':
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head><title>Export PDF</title></head>
              <body>
              ${header}
              ${content}
              ${footer}
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.print();
        }
        break;

      case 'docx':
        const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.docx';
        a.click();
        window.URL.revokeObjectURL(url);
        break;

      case 'markdown':
        const markdownBlob = new Blob([content], { type: 'text/markdown' });
        const markdownUrl = window.URL.createObjectURL(markdownBlob);
        const markdownLink = document.createElement('a');
        markdownLink.href = markdownUrl;
        markdownLink.download = 'document.md';
        markdownLink.click();
        window.URL.revokeObjectURL(markdownUrl);
        break;
    }
  }

  downloadPdf() {
    if (!this.editorContent) return;

    const header = this.getHeader();
    const content = this.editorContent;
    const footer = this.getFooter();

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
            <html>
              <head><title>Export PDF</title></head>
              <body>
              ${header}
              ${content}
              ${footer}
              </body>
            </html>
          `);
      printWindow.document.close();
      printWindow.print();
    }
  }

  private getHeader() {

    const owner = this.selectedOwner()!;
    const seller = this.sellers().find(seller => seller.id === this.prospection()?.seller_id);

    const headerHtml = `
          <table style="width: 100%; margin-bottom: 20px;">
            <tr>
              <td style="width: 50%; vertical-align: top;">
                ${owner?.name}<br>
                ${owner?.street || ''}<br>
                ${owner?.zip || ''}<br>
                ${owner?.city || ''}<br>
                ${owner?.email || ''}<br>
                ${owner?.phone || ''}
              </td>
              <td style="width: 50%; vertical-align: top; text-align: right">
                ${seller?.name || ''}<br>
                ${seller?.address || ''}<br>
                ${seller?.zip || ''}<br>
                ${seller?.city || ''}<br>
                ${seller?.email || ''}<br>
                ${seller?.phone || ''}
              </td>
            </tr>
          </table>
        `;
    return headerHtml;
  }

  private getFooter() {
    const owner = this.selectedOwner()!;
    const footerHtml = `
      <div style="margin-top: 20px;">
        <div>${owner?.name}</div>
        ${owner?.signature ? `<img src="${owner.signature}" alt="Signature" style="max-height: 100px; margin-top: 10px;">` : ''}
      </div>
    `;
    return footerHtml;
  }

  protected selectOwner(owner: any) {
    console.log('select owner', owner);
    this.selectedOwner.set(owner);
  }

  private buildOwnersDropdown(): Signal<UiDropdown<Owner>> {
    return computed(() => {
      const owners = this.owners();
      return {
        value: '',
        list: owners.map(owner => {
          return {
            label: owner.name,
            value: owner
          }
        })
      }
    })
  }
}
