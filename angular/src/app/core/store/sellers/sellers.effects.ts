import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as SellerActions from './sellers.actions';
import { SellerHttpService } from '../../services/seller.http.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class SellerEffects {

  constructor(private actions$: Actions, private sellerService: SellerHttpService, private message: NzMessageService) {}

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

  addSellerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SellerActions.createSellerSuccess),
      tap(() => {
        this.message.success('Vendeur ajouté avec succès!');
      })
    ),
    { dispatch: false }
  );

  addSellerFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SellerActions.createSellerFailure),
      tap(() => {
        this.message.error('Erreur lors de l\'ajout de vendeur!');
      })
    ),
    { dispatch: false }
  );

  updateSeller$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SellerActions.updateSeller),
      mergeMap(action =>
        this.sellerService.update(action.seller?.id!, action.seller).pipe(
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
        this.sellerService.delete(action.id).pipe(
          map(() => SellerActions.removeSellerSuccess({ id: action.id })),
          catchError(error => of(SellerActions.removeSellerFailure({ error })))
        )
      )
    )
  );

}
