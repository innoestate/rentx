import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SellersState } from './sellers.reducer';

export const selectSellersState = createFeatureSelector<SellersState>('sellers');

export const selectAllSellers = createSelector(
  selectSellersState,
  (state: SellersState) => state.sellers
);
