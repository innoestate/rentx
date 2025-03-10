import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProspectionState } from './prospections.reducer';

export const selectProspectionState = createFeatureSelector<ProspectionState>('prospections');

export const selectProspections = createSelector(
  selectProspectionState,
  (state: ProspectionState) => state.prospections
);
