import { Component } from '@angular/core';
import { EstatePage } from '../../../../common/pages/estates.page.component';
import { CreateOwnerPopupComponent } from 'src/app/common/popups/create-owner-popup/create-owner-popup.component';
import { CreateLodgerPopupComponent } from 'src/app/common/popups/create-lodger-popup/create-lodger-popup.component';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Actions } from '@ngrx/effects';
import { RentService } from 'src/app/common/services/rents.service';
import { Estate } from 'src/app/core/models/estate.model';
import { OwnerService } from 'src/app/common/services/owners.service';
import { Owner } from 'src/app/core/models/owner.model';
import { deleteOwner } from 'src/app/core/store/owner/owners.actions';
import { deleteLodger } from 'src/app/core/store/lodger/lodgers.actions';
import { Lodger } from 'src/app/core/models/lodger.model';
import { RentsHttpService } from 'src/app/core/services/rents.http.service';

@Component({
  selector: 'app-estates-page',
  templateUrl: './estates-page.component.html',
  styleUrl: './estates-page.component.scss'
})
export class EstatesMobilePageComponent extends EstatePage {

  constructor(protected override store: Store, protected override modalService: NzModalService, protected override actions$: Actions, protected rentService: RentService, protected ownerService: OwnerService, protected override rentHttpService: RentsHttpService) {
    super(store, modalService, actions$, rentHttpService);
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

  openEditOwner(owner: Owner) {
    this.ownerService.openCreateOwnerPopup(owner);
  }

  deleteOwner(owner: Owner) {
    this.store.dispatch(deleteOwner({ ownerId: owner.id }));
  }

  deleteLodger(lodger: Lodger) {
    this.store.dispatch(deleteLodger({ lodgerId: lodger.id }));
  }

  openRentReceipt(estate: Estate){
    this.rentService.downloadCustomizedRentReceipt(estate)
  }

}
