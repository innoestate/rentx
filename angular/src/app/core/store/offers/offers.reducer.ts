import { createReducer, on } from '@ngrx/store';
import { OfferDto } from '../../models/offer.model';
import * as OffersActions from './offers.actions';

export interface OffersState {
  offers: OfferDto[];
}

export const initialState: OffersState = {
  offers: [],
};

export const OffersReducer = createReducer(
  initialState,
  on(OffersActions.loadOffersSuccess, (state, { offers }) => ({
    ...state,
    offers,
  })),
);

