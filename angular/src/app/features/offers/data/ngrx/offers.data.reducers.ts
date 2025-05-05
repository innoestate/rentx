import { createReducer, on } from '@ngrx/store';
import { Offer } from '../../models/offer.model';
import * as OffersActions from './offers.data.actions';

export interface OffersDataState {
    prospectionOffers: { [prospectionId: string]: Offer[] };
    errors: { [key: string]: any };
    error: any;
}

export const initialState: OffersDataState = {
    prospectionOffers: {},
    errors: {},
    error: null
};

export const offersDataReducer = createReducer(
    initialState,
    on(OffersActions.loadProspectionOffersSuccess, (state, { offers }) => {
        if (!offers.length) return state;
        const prospectionId = offers[0].prospection_id;
        return {
            ...state,
            prospectionOffers: {
                ...state.prospectionOffers,
                [prospectionId]: offers.map(offer => ({
                    id: offer.id,
                    prospection_id: offer.prospection_id,
                    markdown: offer.markdown
                }))
            },
            errors: {
                ...state.errors,
                [prospectionId]: null
            }
        };
    }),
    on(OffersActions.loadProspectionOffersError, (state, { error }) => ({
        ...state,
        errors: {
            ...state.errors,
            load: error
        }
    })),

    on(OffersActions.createOfferSuccess, (state, { offer }) => ({
        ...state,
        prospectionOffers: {
            ...state.prospectionOffers,
            [offer.prospection_id]: [
                ...(state.prospectionOffers[offer.prospection_id] || []),
                {
                    id: offer.id,
                    prospection_id: offer.prospection_id,
                    markdown: offer.markdown
                }
            ]
        },
        errors: {
            ...state.errors,
            create: null
        }
    })),
    on(OffersActions.createOfferError, (state, { error }) => ({
        ...state,
        errors: {
            ...state.errors,
            create: error
        }
    })),

    on(OffersActions.updateOfferSuccess, (state, { offer }) => {
        if (!offer.prospection_id || !state.prospectionOffers[offer.prospection_id]) {
            return state;
        }
        return {
            ...state,
            prospectionOffers: {
                ...state.prospectionOffers,
                [offer.prospection_id]: state.prospectionOffers[offer.prospection_id].map(
                    (existingOffer: Offer) => existingOffer.id === offer.id
                        ? { ...existingOffer, ...offer }
                        : existingOffer
                )
            },
            errors: {
                ...state.errors,
                update: null
            }
        };
    }),
    on(OffersActions.updateOfferError, (state, { error }) => ({
        ...state,
        errors: {
            ...state.errors,
            update: error
        }
    })),

    on(OffersActions.deleteOfferSuccess, (state, { id, prospection_id }) => {
        if (!state.prospectionOffers[prospection_id]) {
            return state;
        }
        return {
            ...state,
            prospectionOffers: {
                ...state.prospectionOffers,
                [prospection_id]: state.prospectionOffers[prospection_id].filter(
                    offer => offer.id !== id
                )
            },
            errors: {
                ...state.errors,
                delete: null
            }
        };
    }),
    on(OffersActions.deleteOfferError, (state, { error }) => ({
        ...state,
        errors: {
            ...state.errors,
            delete: error
        }
    })),
);
