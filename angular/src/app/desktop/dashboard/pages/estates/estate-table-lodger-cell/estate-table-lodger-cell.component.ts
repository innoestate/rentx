import { Component, input } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { combineLatest, delay, Observable, of, race, switchMap, take, tap } from 'rxjs';
import { CompleteRentReceiptPopupComponent } from 'src/app/common/popups/complete-rent-receipt-popup/complete-rent-receipt-popup.component';
import { CreateLodgerPopupComponent } from 'src/app/common/popups/create-lodger-popup/create-lodger-popup.component';
import { Estate } from 'src/app/core/models/estate.model';
import { Lodger } from 'src/app/core/models/lodger.model';
import { Owner } from 'src/app/core/models/owner.model';
import { RentsService } from 'src/app/core/services/rents.service';
import { editEstate, editEstateFailure, editEstateSuccess, senddRentReceipt } from 'src/app/core/store/estate/estates.actions';
import { deleteLodger as deleteLodgerInStore, updateLodger, updateLodgerFailure, updateLodgerSuccess } from 'src/app/core/store/lodger/lodgers.actions';
import { selectLodgers } from 'src/app/core/store/lodger/lodgers.selectors';
import { updateOwner, updateOwnerFailure, updateOwnerSuccess } from 'src/app/core/store/owner/owners.actions';
import { downloadRentReceipt } from 'src/app/core/store/rents/rents.actions';

@Component({
  selector: 'estate-table-lodger-cell',
  templateUrl: './estate-table-lodger-cell.component.html',
  styleUrl: './estate-table-lodger-cell.component.scss'
})
export class EstateTableLodgerCellComponent {

  estate = input.required<Estate>();
  lodgers = this.store.selectSignal(selectLodgers);

  constructor(private store: Store, private rentsService: RentsService, private modalService: NzModalService, private actions$: Actions) { }


  openCreateLodgerPopup() {
    this.modalService.create({
      nzTitle: 'Ajouter un nouveau locataire',
      nzContent: CreateLodgerPopupComponent,
      nzData: { estate: this.estate() },
      nzFooter: null
    });
  }

  openCompletePopupForRentReceipt(fields: string[]) {
    return this.modalService.create({
      nzTitle: 'Compléter les informations pour la quittance',
      nzContent: CompleteRentReceiptPopupComponent,
      nzData: { fields },
      nzFooter: null
    }).afterClose;
  }

  private getNeededFieldsForDownloadRentReceipt() {
    const fields = [];
    if (!this.estate().owner?.street || this.estate().owner?.street === '') {
      fields.push('street');
    }
    if (!this.estate().owner?.city || this.estate().owner?.city === '') {
      fields.push('city');
    }
    if (!this.estate().owner?.zip || this.estate().owner?.zip === '') {
      fields.push('zip');
    }
    if (!this.estate().rent || this.estate().rent === 0) {
      fields.push('rent');
    }
    if (!this.estate().charges || this.estate().charges === 0) {
      fields.push('charges');
    }
    if (!this.estate().owner?.signature || this.estate().owner?.signature === '') {
      fields.push('signature');
    }
    return fields;
  }

  private getNeededFieldsForSendRentReceiptByEmail() {
    const fields = this.getNeededFieldsForDownloadRentReceipt();
    if (this.estate().lodger?.email === '' || !this.estate().lodger?.email) {
      fields.push('lodgerEmail');
    }
    return fields;
  }

  private getUpdateOwnerResultObserables(owner: Owner): Observable<any> {
    if (owner) {
      const ownerUpdateSuccess = this.actions$.pipe(
        ofType(updateOwnerSuccess),
        take(1)
      );
      const ownerUpdateFail = this.actions$.pipe(
        ofType(updateOwnerFailure),
        take(1)
      );
      return race(ownerUpdateSuccess, ownerUpdateFail);
    }
    return of(null);
  }

  private getUpdateEstateResultObserables(estate: Estate): Observable<any> {
    if (estate) {
      const estateUpdateSuccess = this.actions$.pipe(
        ofType(editEstateSuccess),
        take(1)
      );
      const estateUpdateFail = this.actions$.pipe(
        ofType(editEstateFailure),
        take(1)
      );
      return race(estateUpdateSuccess, estateUpdateFail);
    }
    return of(null);
  }

  private updateCompletedObjects(owner: Owner, estate: Estate, lodger?: Lodger) {
    let updates = [];
    if (owner) {
      updates.push(this.getUpdateOwnerResultObserables(owner));
      this.store.dispatch(updateOwner({ owner: { ...owner, id: this.estate().owner?.id! } }));
    }
    if (estate) {
      updates.push(this.getUpdateEstateResultObserables(estate));
      this.store.dispatch(editEstate({ estate: { ...estate, id: this.estate().id } }));
    }
    if (lodger) {
      updates.push(this.getUpdateLodgerResultObserables(lodger));
      this.store.dispatch(updateLodger({ lodger: { ...lodger, id: this.estate().lodger?.id! } }));
    }
    return combineLatest(updates).pipe(
      take(1),
      delay(0)
    );
  }

  private getUpdateLodgerResultObserables(lodger: Lodger) {
    if (lodger) {
      const lodgerUpdateSuccess = this.actions$.pipe(
        ofType(updateLodgerSuccess),
        take(1),
      );
      const lodgerUpdateFail = this.actions$.pipe(
        ofType(updateLodgerFailure),
        take(1)
      );
      return race(lodgerUpdateSuccess, lodgerUpdateFail);
    }
    return null;
  }

  private sendDownloadRentReceiptRequest() {
    this.store.dispatch(downloadRentReceipt({ estateId: this.estate().id }));
  }

  downloadRentReceipt() {

    let fields = this.getNeededFieldsForDownloadRentReceipt();
    if (fields.length > 0) {

      this.openCompletePopupForRentReceipt(fields).pipe(
        take(1),
        switchMap(({ owner, lodger, estate }) => this.updateCompletedObjects(owner, estate, lodger)),
        tap(_ => this.sendDownloadRentReceiptRequest())
      ).subscribe();

    } else {
      this.sendDownloadRentReceiptRequest();
    }
  }

  senddRentReceipt() {

    let fields = this.getNeededFieldsForSendRentReceiptByEmail();
    if (fields.length > 0) {

      this.openCompletePopupForRentReceipt(fields).pipe(
        take(1),
        tap(({ owner, lodger, estate }) => this.updateCompletedObjects(owner, estate, lodger)),
        tap(_ => this.store.dispatch(senddRentReceipt({ estate: this.estate() })))
      ).subscribe();

    } else {
      this.store.dispatch(senddRentReceipt({ estate: this.estate() }));
    }
  }

  createLodger() {
    this.openCreateLodgerPopup();
  }

  setLodger(lodger?: Lodger | null) {
    this.store.dispatch(editEstate({ estate: { id: this.estate().id, lodger_id: lodger?.id ?? '' } }));
  }

  deleteLodger(lodger: Lodger) {
    this.store.dispatch(deleteLodgerInStore({ lodgerId: lodger.id }));
  }


}
