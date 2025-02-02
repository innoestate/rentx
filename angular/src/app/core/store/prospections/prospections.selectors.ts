import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PropertyStatusTypes, PROSPECTION_STATUS } from '../../models/dtos/prospection.dto.model';
import { OfferDto } from '../../models/offer.model';
import { Prospection } from '../../models/prospection.model';
import { ProspectionsFilters } from '../../models/prospections.filters';
import { Seller } from '../../models/seller.model';
import { OffersState } from '../offers/offers.reducer';
import { selectOffersState } from '../offers/offers.selectors';
import { SellersState } from '../sellers/sellers.reducer';
import { selectAllSellers } from '../sellers/sellers.selectors';
import { ProspectionState } from './prospections.reducer';

export const selectProspectionState = createFeatureSelector<ProspectionState>('prospections');
export const sellersSelector = createFeatureSelector<SellersState>('sellers');


export const selectAllProspections = createSelector(
  selectProspectionState,
  (state: ProspectionState) => state.prospections
);

export const selectFilters = createSelector(
  selectProspectionState,
  (state: ProspectionState) => state.filters
)

export const selectFilteredProspections = createSelector(
  selectAllProspections,
  selectFilters,
  selectAllSellers,
  selectOffersState,
  (prospections: Prospection[], filters: ProspectionsFilters, sellers: Seller[], offersState: OffersState) => formatProspections(prospections, filters, sellers, offersState.offers)
);

export const selectAllCities = createSelector(
  selectAllProspections,
  (prospections: Prospection[]) => prospections.map(prospection => prospection.city).filter((value, index, self) => self.indexOf(value) === index)
);



const formatProspections = (prospections: Prospection[], filters: ProspectionsFilters, sellers: Seller[], offers: OfferDto[]) => {

  const filteredProspections = filterProspections(prospections, filters);

  return filteredProspections.map(prospection => {
    const seller = sellers?.find(seller => seller.id === prospection.seller_id);
    return {
      ...prospection,
      seller: seller ? seller : null,
      offer: offers.find(offer => offer.prospection_id === prospection.id),
      statusObject: prospection.status ? { ...PROSPECTION_STATUS.find(status => status.key === prospection.status) } : null
    }
  });
}

const filterProspections = (prospections: Prospection[], filters: ProspectionsFilters) => {
  return prospections.filter(prospection => {
    if (matchWitStatus(prospection, filters.status) || matchWitCity(prospection, filters.city) || matchWitSeller(prospection, filters.sellers)) {
      return false;
    }
    return true;
  });
}

const matchWitStatus = (prospection: Prospection, status: PropertyStatusTypes[]) => {
  return status.length > 0 && prospection.status && !status.includes(prospection.status);
}

const matchWitCity = (prospection: Prospection, city: string[]) => {
  return city.length > 0 && !city.includes(prospection.city??'');
}

const matchWitSeller = (prospection: Prospection, sellers: string[]) => {
  return sellers.length > 0 && !sellers.includes(prospection.seller_id??'');
}
