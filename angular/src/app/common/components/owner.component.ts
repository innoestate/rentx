import { Directive, input } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateOwnerPopupComponent } from 'src/app/common/popups/create-owner-popup/create-owner-popup.component';
import { EditOwnerPopupComponent } from 'src/app/common/popups/edit-owner-popup/edit-owner-popup.component';
import { Estate } from 'src/app/core/models/estate.model';
import { Owner } from 'src/app/core/models/owner.model';
import { editEstate } from 'src/app/core/store/estate/estates.actions';
import { deleteOwner as deleteOwnerOnStore } from 'src/app/core/store/owner/owners.actions';
import { selectOwners } from 'src/app/core/store/owner/owners.selectors';

@Directive()
export class OwnerComponent {

  estate = input.required<Estate>();
  owners = this.store.selectSignal(selectOwners);

  constructor(private store: Store, protected modalService: NzModalService, protected actions$: Actions) { }


  openCreateOwnerPopup() {
    this.modalService.create({
      nzTitle: 'Ajouter un nouveau propriétaire',
      nzContent: CreateOwnerPopupComponent,
      nzFooter: null
    })
  }

  openEditOwnerPopup(owner: Owner) {
    this.modalService.create({
      nzTitle: 'éditier un propriétaire',
      nzContent: EditOwnerPopupComponent,
      nzData: { owner },
      nzFooter: null
    })
  }

  createOwner(estate?: Estate) {
    this.openCreateOwnerPopup();
  }

  setOwner(estate: Estate, owner?: Owner) {
    this.store.dispatch(editEstate({ estate: { ...estate, owner_id: owner!.id } }));
  }

  deleteOwner(owner: Owner) {
    this.store.dispatch(deleteOwnerOnStore({ ownerId: owner.id }));
  }

  editOwner(owner: Owner) {
    this.openEditOwnerPopup(owner);
  }

}
