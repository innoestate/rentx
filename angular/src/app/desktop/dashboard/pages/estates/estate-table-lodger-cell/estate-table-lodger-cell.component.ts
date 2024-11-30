import { Component, input } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { delay, forkJoin, Observable, of, race, switchMap, take, tap } from 'rxjs';
import { CompleteRentReceiptPopupComponent } from 'src/app/common/popups/complete-rent-receipt-popup/complete-rent-receipt-popup.component';
import { CreateLodgerPopupComponent } from 'src/app/common/popups/create-lodger-popup/create-lodger-popup.component';
import { Estate } from 'src/app/core/models/estate.model';
import { Lodger } from 'src/app/core/models/lodger.model';
import { Owner } from 'src/app/core/models/owner.model';
import { RentsService } from 'src/app/core/services/rents.service';
import { editEstate, senddRentReceipt } from 'src/app/core/store/estate/estates.actions';
import { deleteLodger as deleteLodgerInStore, updateLodger, updateLodgerFailure, updateLodgerSuccess } from 'src/app/core/store/lodger/lodgers.actions';
import { selectLodgers } from 'src/app/core/store/lodger/lodgers.selectors';
import { updateOwner, updateOwnerFailure, updateOwnerSuccess } from 'src/app/core/store/owner/owners.actions';

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

  private updateCompletedOwner(owner: Owner) {
    this.store.dispatch(updateOwner({ owner: { ...owner, id: this.estate().owner?.id! } }));
    return this.getUpdateOwnerResultObserables(owner).pipe(
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
    this.rentsService.downloadRentReceipt(this.estate()).pipe(
      take(1),
      tap(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quittance.pdf'; // Set the desired file name
        a.click();
        window.URL.revokeObjectURL(url); // Cle
      })
    ).subscribe();
  }

  downloadRentReceipt() {

    let fields = this.getNeededFieldsForDownloadRentReceipt();
    if (fields.length > 0) {

      this.openCompletePopupForRentReceipt(fields).pipe(
        take(1),
        switchMap(({ owner }) => this.updateCompletedOwner(owner)),
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
        tap(({ owner, lodger }) => {

          let updates = [];
          const ownerUpdatedResult = this.getUpdateOwnerResultObserables(owner);
          if (ownerUpdatedResult) {
            updates.push(ownerUpdatedResult);
            this.store.dispatch(updateOwner({ owner: { ...owner, id: this.estate().owner?.id } }));
          }
          const lodgerUpdatedResult = this.getUpdateLodgerResultObserables(lodger);
          if (lodgerUpdatedResult) {
            updates.push(lodgerUpdatedResult);
            this.store.dispatch(updateLodger({ lodger: { ...lodger, id: this.estate().lodger?.id } }));
          }
          forkJoin(updates).pipe(
            take(1),
            tap(_ => {
              this.store.dispatch(senddRentReceipt({ estate: this.estate() }));
            })
          ).subscribe();
        })
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
