import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProspectionsState } from './prospections.reducers';

export const selectProspectionsState = createFeatureSelector<ProspectionsState>('prospections');

export const selectProspections = createSelector(
  selectProspectionsState,
  (state: ProspectionsState) => state.prospections
);
