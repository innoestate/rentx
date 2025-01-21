import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Subject, takeUntil, tap } from 'rxjs';
import { ProspectionFacade } from 'src/app/core/facade/prospection.facade';
import { ProspectionStoreFacade } from 'src/app/core/facade/prospection.store.facade';
import { Seller } from 'src/app/core/models/seller.model';

@Component({
  selector: 'show-seller-contact-popup',
  templateUrl: './show-seller-contact-popup.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule
  ],
  providers: [ProspectionStoreFacade],
  styleUrls: ['./show-seller-contact-popup.component.css']
})
export class ShowSellerContactPopupComponent implements OnInit, OnDestroy {

  seller: Seller = this.data.seller;
  formGroup: FormGroup = new FormGroup({
    displayName: new FormControl(this.seller.displayName),
    agency: new FormControl(this.seller.agency),
    address: new FormControl(this.seller.address),
    zip: new FormControl(this.seller.zip),
    city: new FormControl(this.seller.city),
    email: new FormControl(this.seller.email),
    phone: new FormControl(this.seller.phone),
  });
  destroyComponent$: Subject<void> = new Subject<void>();

  constructor(
    @Inject(NZ_MODAL_DATA) public data: { seller: Seller },
    private modal: NzModalRef,
    private prospectionFacade: ProspectionStoreFacade
  ) { }

  ngOnInit(): void {
    this.formGroup.valueChanges.pipe(
      takeUntil(this.destroyComponent$),
      tap((value) => {
        const seller: Seller = { ...this.seller, ...value, name: value.displayName };
        this.prospectionFacade.updateSeller(seller);
      })
    ).subscribe();
  }

  close(): void {
    this.modal.close();
  }

  ngOnDestroy(): void {
    this.destroyComponent$.next();
    this.destroyComponent$.complete();
  }
}
