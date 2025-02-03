import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OffersHttpService } from '../../services/offers.http.service';
import * as OffersActions from './offers.actions';

@Injectable()
export class OffersEffects {

  constructor(private actions$: Actions, private offersHttpService: OffersHttpService) {}

  loadOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OffersActions.loadOffers),
      mergeMap(() =>
        this.offersHttpService.getAll().pipe(
          map(offers => OffersActions.loadOffersSuccess({ offers })),
          catchError(error => of(OffersActions.loadOffersFailure({ error })))
        )
      )
    )
  );

}
