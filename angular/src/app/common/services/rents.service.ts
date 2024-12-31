import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { NzModalService } from "ng-zorro-antd/modal";
import { combineLatest, delay, map, Observable, of, race, switchMap, take, tap } from "rxjs";
import { Estate } from "src/app/core/models/estate.model";
import { Lodger } from "src/app/core/models/lodger.model";
import { Owner } from "src/app/core/models/owner.model";
import { editEstate, editEstateFailure, editEstateSuccess } from "src/app/core/store/estate/estates.actions";
import { updateLodger, updateLodgerFailure, updateLodgerSuccess } from "src/app/core/store/lodger/lodgers.actions";
import { updateOwner, updateOwnerFailure, updateOwnerSuccess } from "src/app/core/store/owner/owners.actions";
import { downloadRentReceipt, senddRentReceipt } from "src/app/core/store/rents/rents.actions";
import { CompleteRentReceiptPopupComponent } from "../popups/complete-rent-receipt-popup/complete-rent-receipt-popup.component";
import { CreateCustomizedRentReceiptPopupComponent } from "../popups/create-customized-rent-receipt-popup/create-customized-rent-receipt-popup.component";
import { CreateLodgerPopupComponent } from "../popups/create-lodger-popup/create-lodger-popup.component";

@Injectable({
  providedIn: 'root',
})
export class RentService {

  constructor(private store: Store, private modalService: NzModalService, private actions$: Actions) { }


  protected sendDownloadRentReceiptRequest(estate: Estate) {
    this.store.dispatch(downloadRentReceipt({ estateId: estate.id }));
  }

  openCreateLodgerPopup(estate?: Estate) {
    this.modalService.create({
      nzTitle: 'Ajouter un nouveau locataire',
      nzContent: CreateLodgerPopupComponent,
      nzData: { estate },
      nzFooter: null
    });
  }


  downloadRentReceipt(estate_: Estate) {

    let fields = this.getNeededFieldsForDownloadRentReceipt(estate_);
    if (fields.length > 0) {

      this.openCompletePopupForRentReceipt(fields).pipe(
        take(1),
        switchMap(({ owner, lodger, estate }) => this.updateCompletedObjects({ ...owner, id: estate_.owner?.id }, { ...estate_, ...estate }, { ...lodger, id: estate_.lodger?.id })),
        tap(estate => this.sendDownloadRentReceiptRequest(estate))
      ).subscribe();

    } else {
      this.sendDownloadRentReceiptRequest(estate_);
    }
  }

  sendRentReceiptByEmail(estate_: Estate) {

    let fields = this.getNeededFieldsForSendRentReceiptByEmail(estate_);
    if (fields.length > 0) {
      this.openCompletePopupForRentReceipt(fields).pipe(
        take(1),
        tap(({ owner, lodger, estate }) => this.updateCompletedObjects({ ...owner, id: estate_.owner?.id }, { ...estate, id: estate_.id }, { ...lodger, id: estate_.lodger?.id })),
        tap(_ => this.store.dispatch(senddRentReceipt({ estate: estate_ })))
      ).subscribe();

    } else {
      this.store.dispatch(senddRentReceipt({ estate: estate_ }));
    }
  }

  downloadCustomizedRentReceipt(estate_: Estate) {
    this.openCustomizedRentReceiptPopup(estate_).pipe(
      take(1),
      tap(({ command, type }) => {
        let fields = type === 'send' ? this.getNeededFieldsForSendRentReceiptByEmail(estate_) : this.getNeededFieldsForDownloadRentReceipt(estate_);
        if (fields.length > 0) {

          this.openCompletePopupForRentReceipt(fields).pipe(
            take(1),
            switchMap(({ owner, lodger, estate }) => this.updateCompletedObjects({ ...owner, id: estate_.owner?.id }, { ...estate, id: estate_.id }, { ...lodger, id: estate_.lodger?.id })),
            tap(_ => command())
          ).subscribe();

        } else {
          command();
        }
      })
    ).subscribe();
  }

  private openCustomizedRentReceiptPopup(estate: Estate) {
    return this.modalService.create({
      nzTitle: 'Créer une quittance personnalisée',
      nzContent: CreateCustomizedRentReceiptPopupComponent,
      nzData: { estate: estate },
      nzFooter: null
    }).afterClose;
  }


  private openCompletePopupForRentReceipt(fields: string[]) {
    return this.modalService.create({
      nzTitle: 'Compléter les informations pour la quittance',
      nzContent: CompleteRentReceiptPopupComponent,
      nzData: { fields },
      nzFooter: null
    }).afterClose;
  }


  protected updateCompletedObjects(owner: Owner, estate: Estate, lodger?: Lodger): Observable<Estate> {
    let updates: Observable<any>[] = [];
    if (owner) {
      updates.push(this.getUpdateOwnerResultObserables({ ...owner, id: estate.owner?.id! }));
      this.store.dispatch(updateOwner({ owner: { ...owner, id: estate.owner?.id! } }));
    }
    if (estate) {
      updates.push(this.getUpdateEstateResultObserables(estate));
      this.store.dispatch(editEstate({ estate: { ...estate, id: estate.id } }));
    }
    if (lodger) {
      updates.push(this.getUpdateLodgerResultObserables(lodger));
      this.store.dispatch(updateLodger({ lodger: { ...lodger } }));
    }
    return combineLatest(updates).pipe(
      take(1),
      delay(0),
      map(_ => estate)
    );
  }

  protected getUpdateLodgerResultObserables(lodger: Lodger) {
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
    return of(null);
  }

  protected getUpdateOwnerResultObserables(owner: Owner): Observable<any> {
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

  protected getUpdateEstateResultObserables(estate: Estate): Observable<any> {
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

  protected getNeededFieldsForDownloadRentReceipt(estate: Estate) {
    const fields = [];
    if (!estate.owner?.street || estate.owner?.street === '') {
      fields.push('street');
    }
    if (!estate.owner?.city || estate.owner?.city === '') {
      fields.push('city');
    }
    if (!estate.owner?.zip || estate.owner?.zip === '') {
      fields.push('zip');
    }
    if (!estate.rent || estate.rent === 0) {
      fields.push('rent');
    }
    if (!estate.charges || estate.charges === 0) {
      fields.push('charges');
    }
    if (!estate.owner?.signature || estate.owner?.signature === '') {
      fields.push('signature');
    }
    return fields;
  }

  protected getNeededFieldsForSendRentReceiptByEmail(estate: Estate) {
    const fields = this.getNeededFieldsForDownloadRentReceipt(estate);
    if (estate.lodger?.email === '' || !estate.lodger?.email) {
      fields.push('lodgerEmail');
    }
    return fields;
  }

}
