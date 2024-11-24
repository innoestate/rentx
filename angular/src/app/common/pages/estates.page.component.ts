import { computed, Directive, effect, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Estate } from 'src/app/core/models/estate.model';
import { Owner } from 'src/app/core/models/owner.model';
import { deleteEstate, editEstate, editEstateSuccess, loadEstates } from 'src/app/core/store/estate/estates.actions';
import { selectEstates } from 'src/app/core/store/estate/estates.selectors';
import { selectOwners } from 'src/app/core/store/owner/owners.selectors';
import { formatEstatesDtoToEstateUx } from 'src/app/core/utils/estate.utils';
import { CreateDesktopEstatePopupComponent } from '../popups/create-estate-popup/create-estate-popup.component';
import { CreateOwnerPopupComponent } from '../popups/create-owner-popup/create-owner-popup.component';
import { deleteOwner } from 'src/app/core/store/owner/owners.actions';
import { selectLodgers } from 'src/app/core/store/lodger/lodgers.selectors';
import { CreateLodgerPopupComponent } from '../popups/create-lodger-popup/create-lodger-popup.component';
import { Lodger } from 'src/app/core/models/lodger.model';
import { deleteLodger as deleteLodgerInStore } from 'src/app/core/store/lodger/lodgers.actions';
import { RentsService } from 'src/app/core/services/rents.service';
import { take, tap } from 'rxjs';

@Directive()
export class EstatePage implements OnInit {

  owners = this.store.selectSignal(selectOwners);
  lodgers = this.store.selectSignal(selectLodgers);
  estates = computed(() => formatEstatesDtoToEstateUx(this.store.selectSignal(selectEstates)(), this.owners(), this.lodgers()));
  editId!: string | null;

  constructor(protected store: Store, protected modalService: NzModalService, protected actions$: Actions, private rentsService: RentsService) { }

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
      nzTitle: 'Ajouter un nouveau propriétaire',
      nzContent: CreateOwnerPopupComponent,
      nzFooter: null
    })
  }

  openCreateLodgerPopup(estate?: Estate) {
    this.modalService.create({
      nzTitle: 'Ajouter un nouveau locataire',
      nzContent: CreateLodgerPopupComponent,
      nzData: { estate },
      nzFooter: null
    })
  }

  downloadRentReceipt(estate: Estate) {
    this.rentsService.downloadRentReceipt(estate).pipe(
      take(1),
      tap( blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quittance.pdf'; // Set the desired file name
        a.click();
        window.URL.revokeObjectURL(url); // Cle
      })
    ).subscribe();
  }

  sendRentReceiptByEmail(estate: Estate) {
    // this.store.dispatch({ type: '[Estates] Send Rent Receipt By Email', estateId });
  }

  createOwner(estate?: Estate) {
    this.openCreateOwnerPopup();
  }

  createLodger(estate?: Estate) {
    this.openCreateLodgerPopup(estate);
  }

  setLodger(estate: Estate, lodger?: Lodger) {
    this.store.dispatch(editEstate({ estate: { id: estate.id, lodger_id: lodger!.id } }));
  }

  deleteLodger(lodger: Lodger) {
    this.store.dispatch(deleteLodgerInStore({ lodgerId: lodger.id }));
  }


  deleteEstate(estate: Estate) {
    this.store.dispatch(deleteEstate({ estateId: estate.id }));
  }

  setOwner(estate: Estate, owner?: Owner) {
    this.store.dispatch(editEstate({ estate: { ...estate, owner_id: owner!.id } }));
  }

  deleteOwner(owner: Owner) {
    this.store.dispatch(deleteOwner({ ownerId: owner.id }));
  }

}
