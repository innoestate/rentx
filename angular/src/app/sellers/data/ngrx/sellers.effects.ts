import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as SellerActions from './sellers.actions';
import { SellersHttpService } from '../http/sellers.http.service';

@Injectable()
export class SellersEffects {

  constructor(private actions$: Actions, private http: SellersHttpService) {}

  loadSellers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SellerActions.loadSellers),
      mergeMap(() =>
        this.http.getAll().pipe(
          map(sellers => SellerActions.loadSellersSuccess({ sellers })),
          catchError(error => of(SellerActions.loadSellersFailure({ error })))
        )
      )
    )
  );

  addSeller$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SellerActions.createSeller),
      mergeMap(action =>
        this.http.create(action.seller).pipe(
          map(seller => SellerActions.createSellerSuccess({ seller })),
          catchError(error => of(SellerActions.createSellerFailure({ error })))
        )
      )
    )
  );

  updateSeller$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SellerActions.updateSeller),
      mergeMap( ({seller}) =>
        this.http.update(seller).pipe(
          map(seller => SellerActions.updateSellerSuccess({ seller })),
          catchError(error => of(SellerActions.updateSellerFailure({ error })))
        )
      )
    )
  );

  removeSeller$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SellerActions.removeSeller),
      mergeMap(action =>
        this.http.delete(action.id).pipe(
          map(() => SellerActions.removeSellerSuccess({ id: action.id })),
          catchError(error => of(SellerActions.removeSellerFailure({ error })))
        )
      )
    )
  );

}
