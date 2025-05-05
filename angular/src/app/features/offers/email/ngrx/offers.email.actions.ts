import { createAction, props } from '@ngrx/store';

export const sendOfferByEmail = createAction(
    '[Offers] Send Offer By Email',
    props<{ prospectionId: string, pdfData: ArrayBuffer, emailBody: string }>()
);

export const sendOfferByEmailSuccess = createAction(
    '[Offers] Send Offer By Email Success'
);

export const sendOfferByEmailError = createAction(
    '[Offers] Send Offer By Email Error',
    props<{ error: any }>()
);
