import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OffersEmailHttpService } from '../services/offers.email.http.service';
import * as OffersActions from './offers.email.actions';

@Injectable()
export class OffersEmailEffects {
  constructor(
    private actions$: Actions,
    private offersEmailHttpService: OffersEmailHttpService
  ) { }

  sendOfferByEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OffersActions.sendOfferByEmail),
      mergeMap(({ prospectionId, pdfData, emailBody }) => {
        const base64Pdf = this.arrayBufferToBase64(pdfData);
        return this.offersEmailHttpService.sendOfferPdf(prospectionId, base64Pdf, emailBody).pipe(
          map(() => OffersActions.sendOfferByEmailSuccess()),
          catchError(error => of(OffersActions.sendOfferByEmailError({ error })))
        );
      })
    )
  );

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
