import { Component, input } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, forkJoin, of, race, take, tap } from 'rxjs';
import { CompleteRentReceiptPopupComponent } from 'src/app/common/popups/complete-rent-receipt-popup/complete-rent-receipt-popup.component';
import { CreateLodgerPopupComponent } from 'src/app/common/popups/create-lodger-popup/create-lodger-popup.component';
import { Estate } from 'src/app/core/models/estate.model';
import { Lodger } from 'src/app/core/models/lodger.model';
import { RentsService } from 'src/app/core/services/rents.service';
import { editEstate, editEstateFailure, editEstateSuccess, senddRentReceipt } from 'src/app/core/store/estate/estates.actions';
import { deleteLodger as deleteLodgerInStore } from 'src/app/core/store/lodger/lodgers.actions';
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
      nzData: { fields},
      nzFooter: null
    }).afterClose;
  }

  downloadRentReceipt() {

    let fields = [];
    if( !this.estate().owner?.street || this.estate().owner?.street === '' ){
      fields.push('street');
    }
    if( !this.estate().owner?.city || this.estate().owner?.city === '' ){
      fields.push('city');
    }
    if( !this.estate().owner?.zip || this.estate().owner?.zip === '' ){
      fields.push('zip');
    }
    if( !this.estate().owner?.signature || this.estate().owner?.signature === '' ){
      fields.push('signature');
    }

    if( fields.length > 0){

      this.openCompletePopupForRentReceipt(fields).pipe(
        take(1),
        tap(({ owner, lodger }) => {

          let updates = [];
          if (owner) {
            const ownerUpdateSuccess = this.actions$.pipe(
              ofType(updateOwnerSuccess),
              take(1),
              tap(() => this.store.dispatch(editEstate({ estate: { id: this.estate().id, owner } }))
              ));
            const ownerUpdateFail = this.actions$.pipe(
              ofType(updateOwnerFailure),
              take(1),
              tap(() => {
                console.log('error updating owner');
                this.modalService.error({ nzTitle: 'Erreur', nzContent: 'Une erreur est survenue lors de la mise à jour du propriétaire' });
              })
            );
            updates.push(race(ownerUpdateSuccess, ownerUpdateFail));
            this.store.dispatch(updateOwner({ owner: { ...owner, id: this.estate().owner!.id } }));
          }
          if (lodger) {
            // const lodgerUpdateSuccess = this.actions$.pipe(
            //   ofType(editEstateSuccess),
            //   take(1),
            //   tap(() => this.store.dispatch(editEstate({ estate: { id: this.estate().id, lodger } }))
            // ));

            // updates.push(this.store.dispatch(editEstate({ estate: { id: this.estate().id, lodger } })));
          }

          forkJoin(updates).pipe(
            take(1),

            tap(updateSuccess => {

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

            })

          ).subscribe();


        })
      ).subscribe();

    }else{

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


    // this.rentsService.downloadRentReceipt(this.estate()).pipe(
    //   take(1),
    //   tap(blob => {
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'quittance.pdf'; // Set the desired file name
    //     a.click();
    //     window.URL.revokeObjectURL(url); // Cle
    //   })
    // ).subscribe();
  }

  senddRentReceipt() {
    this.store.dispatch(senddRentReceipt({ estate: this.estate() }));
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
