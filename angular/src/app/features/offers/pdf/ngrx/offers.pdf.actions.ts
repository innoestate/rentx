import { createAction, props } from "@ngrx/store";

export const downloadOffer = createAction(
  '[Offers] Download Offer',
  props<{ owner: any, prospection: any, content: string }>()
);

export const downloadOfferSuccess = createAction(
  '[Offers] Download Offer Success'
);

export const downloadOfferError = createAction(
  '[Offers] Download Offer Error',
  props<{ error: any }>()
);