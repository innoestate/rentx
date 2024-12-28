import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProspectionState } from './prospections.reducer';

export const selectProspectionState = createFeatureSelector<ProspectionState>('prospections');

export const selectAllProspections = createSelector(
  selectProspectionState,
  (state: ProspectionState) => state.prospections
);
