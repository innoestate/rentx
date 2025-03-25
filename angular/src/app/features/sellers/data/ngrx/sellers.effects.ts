import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SellersHttpService } from '../http/sellers.http.service';
import { createSeller, createSellerFailure, createSellerSuccess, loadSellers, loadSellersFailure, loadSellersSuccess, removeSeller, removeSellerFailure, removeSellerSuccess, updateSeller, updateSellerFailure, updateSellerSuccess } from './sellers.actions';

@Injectable()
export class SellersEffects {

  constructor(private actions$: Actions, private http: SellersHttpService) { }

  loadSellers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSellers),
      switchMap(() => this.http.getAll().pipe(
          map(sellers => loadSellersSuccess({ sellers })),
          catchError(err => of(loadSellersFailure(err)))
        )
      )
    )
  );

  addSeller$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createSeller),
      switchMap(action =>
        this.http.create(action.seller).pipe(
          map(seller => createSellerSuccess({ seller })),
          catchError(err => of(createSellerFailure(err)))
        )
      )
    )
  );

  updateSeller$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSeller),
      switchMap(({ seller }) => this.http.update(seller).pipe(
        map(() => updateSellerSuccess({ seller })),
        catchError(err => of(updateSellerFailure(err)))
      )
    ))
  );

  removeSeller$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeSeller),
      switchMap(({ id }) =>
        this.http.delete(id).pipe(
          map(() => removeSellerSuccess({ id })),
          catchError(err => of(removeSellerFailure(err)))
        )
      )
    )
  );

}
