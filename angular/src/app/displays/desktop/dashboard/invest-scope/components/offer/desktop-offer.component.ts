import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, model, OnDestroy, OnInit, signal, Signal } from '@angular/core';
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
import { BehaviorSubject, debounceTime, delay, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { OfferDownloadCompleteDataCommand } from 'src/app/features/offers/commands/offer.complete-data.command';
import { OfferPdfCommand } from 'src/app/features/offers/commands/offer.pdf.command';
import { filledProspection } from 'src/app/features/prospections/adapters/prospections.adapter.utils';
import { Prospection } from 'src/app/features/prospections/models/prospection.model';


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
export class DesktopOfferComponent extends UiDisplayerComponent implements OnInit, OnDestroy {

  prospectionDto = toSignal(this.investScopeStore.onSelectedItem());
  prospection = computed(() => filledProspection(this.prospectionDto()!, this.sellers()));
  sellers = this.sellersData.getSellers();
  prospectionId = computed(() => this.prospection()?.id);
  offers: Signal<{ [prospectionId: string]: OfferDto[] }> = this.offersService.getOffers();
  prospectionOffers: Signal<OfferDto[]> = computed(() => this.offers()[this.prospectionId()!]);
  selectedOffer = model<OfferDto | null>(null);
  selectedOfferId = computed(() => this.selectedOffer()?.id ?? null);
  owners = this.ownersData.getOwners();
  ownersDropdown = this.buildOwnersDropdown();
  selectedOwner = signal<Owner | undefined>(undefined);
  lastChange = signal<string | null>(null);
  editorChanges = new BehaviorSubject<string | null>(null);
  destroyed$ = new Subject();

  editorContent: string = '';
  isEditing = false;

  constructor(
    private offersService: OffersDataService,
    private investScopeStore: InvestScopeDisplayStoreFacade,
    private ownersData: OwnersDataService,
    private sellersData: SellersDataService,
    private offerDownloadCompleteDataCommand: OfferDownloadCompleteDataCommand,
    private offerPdfCommands: OfferPdfCommand,
    private elementRef: ElementRef,
  ) {
    super(elementRef);

    this.ownersData.loadOwners();
    this.initChangeProspectionEffect();
    this.initLoadOffersEffect();
    this.initAutoSave();
  }

  ngOnInit() { }

  editorContentUpdated(change: any) {
    this.editorChanges.next(change.html);
  }

  initAutoSave() {
    this.editorChanges.pipe(
      takeUntil(this.destroyed$),
      debounceTime(1000),
      tap(change => {
        if (change !== this.lastChange() && this.lastChange() !== null && change !== null) {
          this.lastChange.set(change);
          this.saveOffer();
        }
      })
    ).subscribe();
  }

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
        this.lastChange.set(offers[0].markdown ?? '');
        this.editorContent = offers[0].markdown ?? '';
      } else {
        this.lastChange.set('');
        this.editorContent = '';
      }
    });
  }

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

  downloadPdf() {
    if (!this.editorContent) return;
    this.offerDownloadCompleteDataCommand.completeData(this.selectedOwner()!, this.prospection()!).pipe(
      take(1),
      delay(0),
      switchMap(() => {
        return this.offerPdfCommands.downloadPdf(
          this.selectedOwner()!,
          this.fillProspection(this.prospection()!, this.sellers()),
          this.editorContent
        );
      })
    ).subscribe();
  }

  sendPdfByEmail() {
    if (!this.editorContent) return;
    this.offerDownloadCompleteDataCommand.completeData(this.selectedOwner()!, this.prospection()!).pipe(
      take(1),
      delay(0),
      switchMap(() => this.offerPdfCommands.generateAndSendPdf(
        this.selectedOwner()!,
        this.fillProspection(this.prospection()!, this.sellers()),
        this.editorContent,
        this.prospectionId()!
      ))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.destroyed$.unsubscribe();
  }

  private fillProspection(prospection: Prospection, sellers: any[]): Prospection {
    const seller = sellers.find(s => s.id === prospection.seller_id);
    return { ...prospection, seller };
  }

  protected selectOwner(owner: Owner) {
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
