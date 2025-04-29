import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OffersState } from './offers.reducers';

export const selectOffersState = createFeatureSelector<OffersState>('offers');

export const selectOffers = createSelector(
    selectOffersState,
    (state: OffersState) => state.prospectionOffers
);

export const selectProspectionOffers = (prospectionId: string) => createSelector(
    selectOffersState,
    (state: OffersState) => state.prospectionOffers[prospectionId] || []
);

export const selectOffersErrors = createSelector(
    selectOffersState,
    (state: OffersState) => state.errors
);
