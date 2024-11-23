import { computed, Directive, effect, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Estate } from 'src/app/core/models/estate.model';
import { Owner } from 'src/app/core/models/owner.model';
import { editEstate, editEstateSuccess, loadEstates } from 'src/app/core/store/estate/estates.actions';
import { selectEstates } from 'src/app/core/store/estate/estates.selectors';
import { selectOwners } from 'src/app/core/store/owner/owners.selectors';
import { formatEstatesDtoToEstateUx } from 'src/app/core/utils/estate.utils';
import { CreateDesktopEstatePopupComponent } from '../popups/create-estate-popup/create-estate-popup.component';
import { CreateOwnerPopupComponent } from '../popups/create-owner-popup/create-owner-popup.component';

@Directive()
export class EstatePage implements OnInit {

  owners = this.store.selectSignal(selectOwners);
  estates = computed(() => formatEstatesDtoToEstateUx(this.store.selectSignal(selectEstates)(), this.owners()));
  editId!: string | null;

  constructor(protected store: Store, protected modalService: NzModalService, protected actions$: Actions) {}

  ngOnInit(): void {
    this.store.dispatch(loadEstates());
  }


  openCreateEstatePopup() {
    this.modalService.create({
      nzTitle: 'Créer un nouveau bien',
      nzContent: CreateDesktopEstatePopupComponent,
      nzFooter: null
    })
  }

  openCreateOwnerPopup() {
    this.modalService.create({
      nzTitle: 'Créer un nouveau propriétaire',
      nzContent: CreateOwnerPopupComponent,
      nzFooter: null
    })
  }

  sendRentReceiptByEmail(estate: Estate) {
    // this.store.dispatch({ type: '[Estates] Send Rent Receipt By Email', estateId });
  }

  createOwner(estate?: Estate) {
    this.openCreateOwnerPopup();
  }

  deleteEstate(estate: Estate) {
    // this.store.dispatch({ type: '[Estates] Delete Estate', estateId });
  }

  setOwner(estate: Estate, owner?: Owner) {
    this.store.dispatch(editEstate({ estate: { ...estate, owner_id: owner!.id } }));
  }

}
