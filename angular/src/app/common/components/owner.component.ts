import { Directive, input } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CreateOwnerPopupComponent } from 'src/app/common/popups/create-owner-popup/create-owner-popup.component';
import { EditOwnerPopupComponent } from 'src/app/common/popups/edit-owner-popup/edit-owner-popup.component';
import { Estate } from 'src/app/core/models/estate.model';
import { Owner } from 'src/app/core/models/owner.model';
import { editEstate } from 'src/app/core/store/estate/estates.actions';
import { deleteOwner as deleteOwnerOnStore } from 'src/app/core/store/owner/owners.actions';
import { selectOwners } from 'src/app/core/store/owner/owners.selectors';
import { PopupService } from 'src/app/ux/popup/services/popup.service';

@Directive()
export class OwnerComponent {

  estate = input.required<Estate>();
  owners = this.store.selectSignal(selectOwners);

  constructor(protected store: Store, protected popupService: PopupService, protected actions$: Actions) { }


  openCreateOwnerPopup() {
    this.popupService.openPopup(CreateOwnerPopupComponent, 'Ajouter un nouveau propriétaire')
  }

  openEditOwnerPopup(owner: Owner) {
    this.popupService.openPopup(EditOwnerPopupComponent, 'éditier un propriétaire', { owner });
  }

  createOwner(estate?: Estate) {
    this.openCreateOwnerPopup();
  }

  setOwner(estate: Estate, owner?: Owner | null) {
    this.store.dispatch(editEstate({ estate: { ...estate, owner_id: owner!.id } }));
  }

  deleteOwner(owner: Owner) {
    this.store.dispatch(deleteOwnerOnStore({ ownerId: owner.id }));
  }

  editOwner(owner: Owner) {
    this.openEditOwnerPopup(owner);
  }

}
