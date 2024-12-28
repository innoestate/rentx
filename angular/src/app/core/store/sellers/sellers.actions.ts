import { createAction, props } from '@ngrx/store';
import { Seller } from '../../models/seller.model';

export const loadSellers = createAction('[Seller] Load Sellers');
export const loadSellersSuccess = createAction('[Seller] Load Sellers Success', props<{ sellers: Seller[] }>());
export const loadSellersFailure = createAction('[Seller] Load Sellers Failure', props<{ error: any }>());

export const createSeller = createAction('[Seller] Create Seller', props<{ seller: Seller }>());
export const createSellerSuccess = createAction('[Seller] Create Seller Success', props<{ seller: Seller }>());
export const createSellerFailure = createAction('[Seller] Create Seller Failure', props<{ error: any }>());
