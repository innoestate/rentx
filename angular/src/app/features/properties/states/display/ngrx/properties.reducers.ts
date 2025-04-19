import { createReducer, on } from '@ngrx/store';
import { PropertiesDisplay } from '../../../models/properties.display-map.model';
import * as PropertiesActions from './properties.actions';

export const propertiesFeatureKey = 'properties';

export interface PropertiesState {
  displays: PropertiesDisplay[];
  navigation: 'estates' | 'owners' | 'lodgers';
}

export const initialState: PropertiesState = {
  displays: [],
  navigation: 'estates',
};

export const propertiesReducer = createReducer(
  initialState,
  on(PropertiesActions.addDisplayedComponent, (state, { component }) => ({
    ...state,
    displays: [...state.displays, component],
  })),
  on(PropertiesActions.removeDisplayedComponent, (state, { component }) => ({
    ...state,
    displays: state.displays.filter((display) => display !== component),
  })),
  on(PropertiesActions.clearDisplayedComponents, (state) => ({
    ...state,
    displays: [],
  })),
  on(PropertiesActions.navigate, (state, { navigation }) => ({
    ...state,
    navigation,
  }))
);
