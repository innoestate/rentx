import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Seller } from '../../models/seller.model';
import { OffersState } from './offers.reducer';

export const selectOffersState = createFeatureSelector<OffersState>('offers');

export const selectAllOffers = createSelector(
  selectOffersState,
  (state: OffersState) => state.offers.map(offer => ({ ...offer }))
);
