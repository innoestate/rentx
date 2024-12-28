import { createReducer, on } from '@ngrx/store';
import * as SellerActions from './sellers.actions';
import { SellerDTO } from '../../models/dtos/seller.dto.model';

export interface SellersState {
  sellers: SellerDTO[];
}

export const initialState: SellersState = {
  sellers: [],
};

export const sellersReducer = createReducer(
  initialState,
  on(SellerActions.loadSellersSuccess, (state, { sellers }) => ({
    ...state,
    sellers,
  })),
  on(SellerActions.createSellerSuccess, (state, { seller }) => ({
    ...state,
    sellers: [...state.sellers, seller],
  })),
);

