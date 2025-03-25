import { createReducer, on } from '@ngrx/store';
import { Seller_Dto } from '../../models/seller.dto.model';
import { createSellerSuccess, loadSellersSuccess, reloadSeller, removeSellerSuccess, updateSellerSuccess } from './sellers.actions';

export interface SellersState {
  sellers: Seller_Dto[];
}

export const initialState: SellersState = {
  sellers: [],
};

export const sellersReducer = createReducer(
  initialState,
  on(loadSellersSuccess, (state, { sellers }) => ({
    ...state,
    sellers,
  })),
  on(createSellerSuccess, (state, { seller }) => ({
    ...state,
    sellers: [...state.sellers, seller],
  })),
  on(removeSellerSuccess, (state, { id }) => ({
    ...state,
    sellers: state.sellers.filter(seller => seller.id !== id),
  })),
  on(updateSellerSuccess, (state, { seller }) => ({
    ...state,
    sellers: state.sellers.map(actualSeller => (actualSeller.id === seller.id ? {...actualSeller, ...seller} : actualSeller)),
  })),
  on(reloadSeller, (state, { sellerId }) => ({
    ...state,
    sellers: state.sellers.map(actualSeller =>
      actualSeller.id === sellerId ? { ...actualSeller, isReloaded: true } : actualSeller
    )
  }))
);

