import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProspectionState } from './prospections.reducer';
import { SellersState } from '../sellers/sellers.reducer';
import { Prospection } from '../../models/prospection.model';
import { Seller } from '../../models/seller.model';
import { selectSellersState } from '../sellers/sellers.selectors';

export const selectProspectionState = createFeatureSelector<ProspectionState>('prospections');
export const sellersSelector = createFeatureSelector<SellersState>('sellers');

export const selectAllProspections = createSelector(
  selectProspectionState,
  selectSellersState,
  (state: ProspectionState, sellersState: SellersState) => formatProspections(state.prospections, sellersState?.sellers)
);


const formatProspections = (prospections: Prospection[], sellers: Seller[]) => {
  return prospections.map(prospection => {
    const seller = sellers?.find(seller => seller.id === prospection.seller_id);
    return {
      ...prospection,
      seller: seller ? seller : null,
    }
  });
}
