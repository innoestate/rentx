import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SellersState } from './sellers.reducer';
import { Seller } from '../../models/seller.model';

export const selectSellersState = createFeatureSelector<SellersState>('sellers');

export const selectAllSellers = createSelector(
  selectSellersState,
  (state: SellersState) => state.sellers.map(seller => ({ ...seller, displayName: setDisplayName(seller) }))
);

const setDisplayName = (seller: Seller) => {

  let displayName: any = seller.name;
  if(!displayName || displayName === '') {
    displayName = seller.agency;
  }
  if(!displayName || displayName === '') {
    displayName = 'inconnu';
  }

  return displayName ;

};
