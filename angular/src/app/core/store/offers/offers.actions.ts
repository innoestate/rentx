import { createAction, props } from '@ngrx/store';
import { OfferDto } from '../../models/offer.model';

export const loadOffers = createAction('[Offers] Load Offers');
export const loadOffersSuccess = createAction('[Offers] Load Offers Success', props<{ offers: OfferDto[] }>());
export const loadOffersFailure = createAction('[Offers] Load Offers Failure', props<{ error: any }>());
