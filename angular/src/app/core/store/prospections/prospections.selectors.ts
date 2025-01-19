import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProspectionState } from './prospections.reducer';
import { SellersState } from '../sellers/sellers.reducer';
import { Prospection } from '../../models/prospection.model';
import { Seller } from '../../models/seller.model';
import { selectAllSellers, selectSellersState } from '../sellers/sellers.selectors';
import { PROSPECTION_STATUS } from '../../models/dtos/prospection.dto.model';
import { selectAllOffers, selectOffersState } from '../offers/offers.selectors';
import { OfferDto } from '../../models/offer.model';
import { OffersState } from '../offers/offers.reducer';

export const selectProspectionState = createFeatureSelector<ProspectionState>('prospections');
export const sellersSelector = createFeatureSelector<SellersState>('sellers');

export const selectAllProspections = createSelector(
  selectProspectionState,
  selectAllSellers,
  selectOffersState,
  (state: ProspectionState, sellers: Seller[], offersState: OffersState) => formatProspections(state.prospections, sellers,  offersState.offers)
);


const formatProspections = (prospections: Prospection[], sellers: Seller[], offers: OfferDto[]) => {
  return prospections.map(prospection => {
    const seller = sellers?.find(seller => seller.id === prospection.seller_id);
    return {
      ...prospection,
      seller: seller ? seller : null,
      offer: offers.find( offer => offer.prospection_id === prospection.id),
      statusObject: prospection.status ? {... PROSPECTION_STATUS.find(status => status.key === prospection.status)} : null
    }
  });
}
