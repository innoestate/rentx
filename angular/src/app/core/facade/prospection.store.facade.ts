import { Injectable, Signal } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Prospection } from "../models/prospection.model";
import { Seller } from "../models/seller.model";
import { updateProspection, updateProspectionFailure, updateProspectionSuccess } from "../store/prospections/prospections.actions";
import { selectAllSellers } from "../store/sellers/sellers.selectors";
import { ProspectionFacade } from "./prospection.facade";
import { catchError, map, Observable, of } from "rxjs";
import { toSignal } from '@angular/core/rxjs-interop';
import { createSeller, createSellerSuccess, removeSeller as removeSellerAction, updateSeller, updateSellerSuccess } from "../store/sellers/sellers.actions";

@Injectable({
  providedIn: 'root'
})
export class ProspectionStoreFacade extends ProspectionFacade {

  constructor(private store: Store, private actions$: Actions) {
    super();
  }

  createSeller(seller: Seller): Signal<Seller | undefined> {
    this.store.dispatch(createSeller({ seller }));
    return toSignal(this.actions$.pipe(
      ofType(createSellerSuccess),
      map(action => action.seller)
    ));
  }

  removeSeller(seller: Seller) {
    this.store.dispatch(removeSellerAction({ id:seller.id! }));
  }

  getSellers(): Signal<Seller[]> {
    return this.store.selectSignal(selectAllSellers);
  }

  updateSeller(seller: Seller): Observable<Seller | undefined> {
    this.store.dispatch(updateSeller({ seller }));
    return this.actions$.pipe(
      ofType(updateSellerSuccess),
      map(action => action.seller)
    );
  }

  setSeller(prospection: Prospection, seller: Seller) {
    this.store.dispatch(updateProspection({ id: prospection.id as string, changes: { seller_id: seller.id } }));
  }

  setSellerSuccess() {
    return toSignal(this.actions$.pipe(
      ofType(updateProspectionSuccess),
      catchError(() => of(false)),
      map(() => true)
    ));
  }

  setSellerFailure() {
    return toSignal(this.actions$.pipe(
      ofType(updateProspectionFailure),
      map(() => true)
    ));
  }

}
