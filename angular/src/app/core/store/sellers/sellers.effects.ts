import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as SellerActions from './sellers.actions';
import { SellerHttpService } from '../../services/seller.http.service';

@Injectable()
export class SellerEffects {

  constructor(private actions$: Actions, private sellerService: SellerHttpService) {}

  loadSellers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SellerActions.loadSellers),
      mergeMap(() =>
        this.sellerService.getAll().pipe(
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
        this.sellerService.create(action.seller).pipe(
          map(seller => SellerActions.createSellerSuccess({ seller })),
          catchError(error => of(SellerActions.createSellerFailure({ error })))
        )
      )
    )
  );

}
