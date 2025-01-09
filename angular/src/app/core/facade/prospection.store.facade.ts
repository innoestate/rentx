import { Injectable, Signal } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Prospection } from "../models/prospection.model";
import { Seller } from "../models/seller.model";
import { updateProspection, updateProspectionFailure, updateProspectionSuccess } from "../store/prospections/prospections.actions";
import { selectAllSellers } from "../store/sellers/sellers.selectors";
import { ProspectionFacade } from "./prospection.facade";
import { catchError, map, of } from "rxjs";
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProspectionStoreFacade extends ProspectionFacade {

  constructor(private store: Store, private actions$: Actions) {
    super();
  }

  getSellers(): Signal<Seller[]> {
    console.log('get sellers');
    return this.store.selectSignal(selectAllSellers);
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
