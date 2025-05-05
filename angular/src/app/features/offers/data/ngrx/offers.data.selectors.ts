import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OffersDataState } from './offers.data.reducers';

export const selectOffersState = createFeatureSelector<OffersDataState>('offers');

export const selectOffers = createSelector(
    selectOffersState,
    (state: OffersDataState) => state.prospectionOffers
);

export const selectProspectionOffers = (prospectionId: string) => createSelector(
    selectOffersState,
    (state: OffersDataState) => state.prospectionOffers[prospectionId] || []
);

export const selectOffersErrors = createSelector(
    selectOffersState,
    (state: OffersDataState) => state.errors
);
