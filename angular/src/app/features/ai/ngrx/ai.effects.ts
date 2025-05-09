import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AiActions from './ai.actions';

@Injectable()
export class AiEffects {
  getUserTokens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AiActions.getUserTokens),
      mergeMap(() =>
        // Replace this with your actual API service call
        of({ tokens: 100 }).pipe(
          map(response => AiActions.getUserTokensSuccess({ tokens: response.tokens })),
          catchError(error => of(AiActions.getUserTokensFailure({ error })))
        )
      )
    )
  );

  getInvestorProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AiActions.getInvestorProfile),
      mergeMap(() =>
        // Replace this with your actual API service call
        of({ profile: ['profile1', 'profile2'] }).pipe(
          map(response => AiActions.getInvestorProfileSuccess({ profile: response.profile })),
          catchError(error => of(AiActions.getInvestorProfileFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions) {}
}
