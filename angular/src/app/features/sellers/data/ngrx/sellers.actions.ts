import { createAction, props } from '@ngrx/store';
import { Seller_Dto } from '../../models/seller.dto.model';

export const loadSellers = createAction('[Seller] Load Sellers');
export const loadSellersSuccess = createAction('[Seller] Load Sellers Success', props<{ sellers: Seller_Dto[] }>());
export const loadSellersFailure = createAction('[Seller] Load Sellers Failure', props<{ error: any }>());

export const createSeller = createAction('[Seller] Create Seller', props<{ seller: Seller_Dto }>());
export const createSellerSuccess = createAction('[Seller] Create Seller Success', props<{ seller: Seller_Dto }>());
export const createSellerFailure = createAction('[Seller] Create Seller Failure', props<{ error: any }>());

export const updateSeller = createAction('[Seller] Update Seller', props<{ seller: Partial<Seller_Dto> }>());
export const updateSellerSuccess = createAction('[Seller] Update Seller Success', props<{ seller: Partial<Seller_Dto> }>());
export const updateSellerFailure = createAction('[Seller] Update Seller Failure', props<{ error: any }>());

export const removeSeller = createAction('[Seller] Remove Seller', props<{ id: string }>());
export const removeSellerSuccess = createAction('[Seller] Remove Seller Success', props<{ id: string }>());
export const removeSellerFailure = createAction('[Seller] Remove Seller Failure', props<{ error: any }>());

export const reloadSeller = createAction('[Seller] Reload Seller', props<{ sellerId: string }>());