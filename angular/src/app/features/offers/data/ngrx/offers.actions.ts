import { createAction, props } from '@ngrx/store';
import { OfferDto } from '../../models/offer.dto.model';

export const loadProspectionOffers = createAction(
    '[Offers] Load Prospection Offers',
    props<{ prospection_id: string }>()
);
export const loadProspectionOffersSuccess = createAction(
    '[Offers] Load Prospection Offers Success',
    props<{ offers: OfferDto[] }>()
);
export const loadProspectionOffersError = createAction(
    '[Offers] Load Prospection Offers Error',
    props<{ error: any }>()
);

export const createOffer = createAction(
    '[Offers] Create Offer',
    props<{ offer: {prospection_id: string, markdown?: string} }>()
);
export const createOfferSuccess = createAction(
    '[Offers] Create Offer Success',
    props<{ offer: OfferDto }>()
);
export const createOfferError = createAction(
    '[Offers] Create Offer Error',
    props<{ error: any }>()
);

export const updateOffer = createAction(
    '[Offers] Update Offer',
    props<{ offer: Partial<OfferDto> }>()
);
export const updateOfferSuccess = createAction(
    '[Offers] Update Offer Success',
    props<{ offer: Partial<OfferDto> }>()
);
export const updateOfferError = createAction(
    '[Offers] Update Offer Error',
    props<{ error: any }>()
);

export const deleteOffer = createAction(
    '[Offers] Delete Offer',
    props<{ id: string; prospection_id: string }>()
);
export const deleteOfferSuccess = createAction(
    '[Offers] Delete Offer Success',
    props<{ id: string; prospection_id: string }>()
);
export const deleteOfferError = createAction(
    '[Offers] Delete Offer Error',
    props<{ error: any }>()
);
