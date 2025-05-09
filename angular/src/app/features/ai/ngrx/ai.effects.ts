import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AiActions from './ai.actions';
import { AiHttpService } from '../services/ai.http.service';

@Injectable()
export class AiEffects {
  getUserTokens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AiActions.getUserTokens),
      mergeMap(() =>
        this.aiService.getUserTokens().pipe(
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
        this.aiService.getInvestorProfile().pipe(
          map(response => AiActions.getInvestorProfileSuccess({ profile: response.profile })),
          catchError(error => of(AiActions.getInvestorProfileFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private aiService: AiHttpService
  ) {}
}
