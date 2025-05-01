import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, model, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { QuillModule } from 'ngx-quill';
import { InvestScopeDisplayStoreFacade } from 'src/app/features/invest-scope/states/display/facades/invest-scope.display-store.facade';
import { OffersDataService } from 'src/app/features/offers/data/services/offers.data.service';
import { OfferDto } from 'src/app/features/offers/models/offer.dto.model';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
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
  selectedOffer = model<OfferDto | null>(null);
  selectedOfferId = computed(() => this.selectedOffer()?.id ?? null);

  editorContent: string = '';
  isEditing = false;

  constructor(
    private offersService: OffersDataService,
    private investScopeStore: InvestScopeDisplayStoreFacade,
    private elementRef: ElementRef
  ) {
    super(elementRef);

    this.initChangeProspectionEffect();
    this.initLoadOffersEffect();
    // this.initSelectedOfferEffect();
  }

  ngOnInit() {}

  initChangeProspectionEffect(){
    effect(() => {
      const prospectionId = this.prospectionId();
      this.selectedOffer.set(null);
      if(prospectionId){
        this.offersService.loadProspectionOffers(prospectionId);
      }
    })
  }

  initLoadOffersEffect(){
    effect(() => {
      const offers = this.prospectionOffers();

      //IF already working in an offer and it is just an update,
      //Don't change the selected offer.

      //ELSE We have to reselection the offers.

      //So how to know it ?
      //-> if the selectedOffer is null, the it is the 2nd case
      console.log('load offers', offers)

      if(this.selectedOffer()){

      }else if(offers?.length){
        this.selectedOffer.set(offers[0]);
        this.editorContent = offers[0].markdown ?? '';
      }else{
        this.editorContent = 'init';
      }

      if (offers?.length > 0 && !this.selectedOffer()) {
        // this.selectedOffer.set(offers[0]);
      }
    });
  }

  // initSelectedOfferEffect(){
  //   effect(() => {
  //     const offers = this.prospectionOffers();
  //     if (offers?.length > 0 && !this.selectedOffer()) {
  //       this.selectedOffer.set(offers[0]);
  //       this.editorContent = offers[0].markdown ?? '';
  //     }else{
  //       this.editorContent = 'init';
  //     }
  //   });
  // }

  saveOffer(){
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
