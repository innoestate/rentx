import { Directive, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { take, tap } from 'rxjs';
import { Estate } from 'src/app/core/models/estate.model';
import { Lodger } from 'src/app/core/models/lodger.model';
import { RentsService } from 'src/app/core/services/rents.service';
import { deleteEstate, editEstate, loadEstates, senddRentReceipt } from 'src/app/core/store/estate/estates.actions';
import { selectEstates } from 'src/app/core/store/estate/estates.selectors';
import { deleteLodger as deleteLodgerInStore } from 'src/app/core/store/lodger/lodgers.actions';
import { selectLodgers } from 'src/app/core/store/lodger/lodgers.selectors';
import { selectOwners } from 'src/app/core/store/owner/owners.selectors';
import { CreateDesktopEstatePopupComponent } from '../popups/create-estate-popup/create-estate-popup.component';
import { CreateLodgerPopupComponent } from '../popups/create-lodger-popup/create-lodger-popup.component';

@Directive()
export class EstatePage implements OnInit {

  owners = this.store.selectSignal(selectOwners);
  lodgers = this.store.selectSignal(selectLodgers);
  estates = this.store.selectSignal(selectEstates);
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

  senddRentReceipt(estate: Estate) {
    this.store.dispatch(senddRentReceipt({ estate}));
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

}
