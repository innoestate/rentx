import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { downloadPdf } from '../utils/offers.pdf.utils';
import { downloadOffer, downloadOfferError, downloadOfferSuccess } from './offers.pdf.actions';

@Injectable()
export class OffersPdfEffects {
    constructor(
        private actions$: Actions,
    ) { }

    downloadOffer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(downloadOffer),
            mergeMap(({ owner, prospection, content }) =>
                from(downloadPdf(owner, prospection, content)).pipe(
                    map(() => downloadOfferSuccess()),
                    catchError(error => of(downloadOfferError({ error })))
                )
            )
        )
    );
}
