import { Component, Input, OnInit, ElementRef, computed, Signal, signal, effect, model } from '@angular/core';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { QuillModule } from 'ngx-quill';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { OffersDataService } from 'src/app/features/offers/data/services/offers.data.service';
import { OfferDto } from 'src/app/features/offers/models/offer.dto.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { InvestScopeDisplayStoreFacade } from 'src/app/features/invest-scope/states/display/facades/invest-scope.display-store.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
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
    OfferIconsComponent
  ]
})
export class DesktopOfferComponent extends UiDisplayerComponent implements OnInit {

  prospection = toSignal(this.investScopeStore.onSelectedItem());
  prospectionId = computed(() => this.prospection()?.id);
  offers: Signal<{ [prospectionId: string]: OfferDto[] }> = this.offersService.getOffers();

  prospectionOffers: Signal<OfferDto[]> = computed(() => this.offers()[this.prospectionId()!]);

  selectedOfferId = signal<string | null>(null);

  editorContent: string = '';
  selectedOffer = model<OfferDto | null>(null);
  isEditing = false;

  constructor(
    private offersService: OffersDataService,
    private investScopeStore: InvestScopeDisplayStoreFacade,
    private elementRef: ElementRef
  ) {
    super(elementRef);

    effect(() => {

      const offers = this.prospectionOffers();
      console.log('offers', offers);

    })

    effect(() => {
      const prospectionId = this.prospectionId()
      if(prospectionId){
        this.offersService.loadProspectionOffers(prospectionId);

        // this.offersService.getProspectionOffers(prospectionId).pipe(
        //   take(1),
        //   tap(offers => {
        //     console.log('offers', offers)
        //   })
        // ).subscribe((offers: OfferDto[]) => {
        //   console.log('offers', offers);
        //   // this.offers.set(offers);
        // });
      }
    })

  }

  ngOnInit() {}

  saveOffer(){

    const content = this.editorContent;
    if(this.selectedOfferId() === null){
      this.offersService.createOffer({
        prospection_id: this.prospectionId()!,
        markdown: this.editorContent
      }).subscribe();
    }else{
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
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
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

    const content = this.editorContent;

    switch (format) {
      case 'pdf':
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head><title>Export PDF</title></head>
              <body>${content}</body>
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
}
