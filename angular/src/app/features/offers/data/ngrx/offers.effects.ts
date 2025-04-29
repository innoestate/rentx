import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OffersHttpService } from '../http/offers.http.service';
import * as OffersActions from './offers.actions';
import { OfferDto } from '../../models/offer.dto.model';

@Injectable()
export class OffersEffects {
    constructor(
        private actions$: Actions,
        private offersService: OffersHttpService
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
}
