import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OffersEmailHttpService } from '../../email/services/offers.email.http.service';
import { OfferDto } from '../../models/offer.dto.model';
import { downloadPdf } from '../../utils/offers.pdf.utils';
import { OffersHttpService } from '../http/offers.http.service';
import * as OffersActions from './offers.data.actions';
import { downloadOffer, downloadOfferError, downloadOfferSuccess } from '../../pdf/ngrx/offers.pdf.actions';

@Injectable()
export class OffersDataEffects {
    constructor(
        private actions$: Actions,
        private offersService: OffersHttpService,
        private offersEmailHttpService: OffersEmailHttpService
    ) { }

    loadProspectionOffers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OffersActions.loadProspectionOffers),
            mergeMap(({ prospection_id }) =>
                this.offersService.getOffersByProspectionId(prospection_id).pipe(
                    map((offers: OfferDto[]) => OffersActions.loadProspectionOffersSuccess({ offers })),
                    catchError(error => of(OffersActions.loadProspectionOffersError({ error })))
                )
            )
        )
    );

    createOffer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OffersActions.createOffer),
            mergeMap(({ offer }) =>
                this.offersService.createOffer(offer).pipe(
                    map((createdOffer: OfferDto) => OffersActions.createOfferSuccess({ offer: createdOffer })),
                    catchError(error => of(OffersActions.createOfferError({ error })))
                )
            )
        )
    );

    updateOffer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OffersActions.updateOffer),
            mergeMap(({ offer }) =>
                this.offersService.updateOffer(offer).pipe(
                    map((updatedOffer: OfferDto) => OffersActions.updateOfferSuccess({ offer: updatedOffer })),
                    catchError(error => of(OffersActions.updateOfferError({ error })))
                )
            )
        )
    );

    deleteOffer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OffersActions.deleteOffer),
            mergeMap(({ id, prospection_id }) =>
                this.offersService.deleteOffer(id).pipe(
                    map(() => OffersActions.deleteOfferSuccess({ id, prospection_id })),
                    catchError(error => of(OffersActions.deleteOfferError({ error })))
                )
            )
        )
    );

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
