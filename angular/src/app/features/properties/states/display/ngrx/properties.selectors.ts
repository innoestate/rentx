import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PropertiesState, propertiesFeatureKey } from './properties.reducers';

export const selectPropertiesState = createFeatureSelector<PropertiesState>(
  propertiesFeatureKey
);

export const selectDisplays = createSelector(
  selectPropertiesState,
  (state) => state.displays
);

export const selectNavigation = createSelector(
  selectPropertiesState,
  (state) => state.navigation
);
