import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProspectionState } from './prospections.reducer';
import { SellersState } from '../sellers/sellers.reducer';
import { Prospection } from '../../models/prospection.model';
import { Seller } from '../../models/seller.model';
import { selectAllSellers, selectSellersState } from '../sellers/sellers.selectors';
import { PROSPECTION_STATUS } from '../../models/dtos/prospection.dto.model';

export const selectProspectionState = createFeatureSelector<ProspectionState>('prospections');
export const sellersSelector = createFeatureSelector<SellersState>('sellers');

export const selectAllProspections = createSelector(
  selectProspectionState,
  selectAllSellers,
  (state: ProspectionState, sellers: Seller[]) => formatProspections(state.prospections, sellers)
);


const formatProspections = (prospections: Prospection[], sellers: Seller[]) => {
  return prospections.map(prospection => {
    const seller = sellers?.find(seller => seller.id === prospection.seller_id);
    return {
      ...prospection,
      seller: seller ? seller : null,
      statusObject: prospection.status ? {... PROSPECTION_STATUS.find(status => status.key === prospection.status)} : null
    }
  });
}
