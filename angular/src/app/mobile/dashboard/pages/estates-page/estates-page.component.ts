import { Component } from '@angular/core';
import { EstatePage } from '../../../../common/pages/estates.page.component';
import { CreateOwnerPopupComponent } from 'src/app/common/popups/create-owner-popup/create-owner-popup.component';
import { CreateLodgerPopupComponent } from 'src/app/common/popups/create-lodger-popup/create-lodger-popup.component';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Actions } from '@ngrx/effects';
import { RentService } from 'src/app/common/services/rents.service';
import { Estate } from 'src/app/core/models/estate.model';

@Component({
  selector: 'app-estates-page',
  templateUrl: './estates-page.component.html',
  styleUrl: './estates-page.component.scss'
})
export class EstatesMobilePageComponent extends EstatePage {

  constructor(protected override store: Store, protected override modalService: NzModalService, protected override actions$: Actions, protected rentService: RentService) {
    super(store, modalService, actions$);
  }


  openCreateOwner() {
    this.modalService.create({
      nzTitle: 'Ajouter un nouveau propriétaire',
      nzContent: CreateOwnerPopupComponent,
      nzFooter: null
    })
  }

  openCreateLodger() {
    this.rentService.openCreateLodgerPopup();
  }

  openRentReceipt(estate: Estate){
    this.rentService.downloadCustomizedRentReceipt(estate)
  }

}
