import { createReducer, on } from "@ngrx/store";
import { InvestScopeDisplayedElement } from "../../../models/invest-scope.display-map.model";
import { addDisplayedComponent, clearDisplayedComponents, navigate, removeDisplayedComponent, selectItem } from "./invest-scope.actions";
import { Prospection } from '../../../../prospections/models/prospection.model'

export interface InvestScopeState {
  displayedComponents: InvestScopeDisplayedElement[];
  navigation: 'prospections' | 'sellers';
  selectedItem: Prospection | null;
}

export const investScopeReducer = createReducer<InvestScopeState>(
  {
    displayedComponents: [],
    navigation: 'prospections',
    selectedItem: null
  },
  on(clearDisplayedComponents, (state) => ({
    ...state,
    displayedComponents: []
  })),
  on(addDisplayedComponent, (state, { component }) => ({
    ...state,
    displayedComponents: [...state.displayedComponents, component]
  })),
  on(removeDisplayedComponent, (state, { component }) => ({
    ...state,
    displayedComponents: state.displayedComponents.filter(c => c !== component)
  })),
  on(selectItem, (state, { item }) => ({
    ...state,
    selectedItem: item
  })),
  on(navigate, (state, { navigation }) => ({
    ...state,
    navigation: navigation
  }))
);
