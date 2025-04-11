import { createReducer, on } from "@ngrx/store";
import { InvestScopeDisplayedElement } from "../../../models/invest-scope.display-map.model";
import { addDisplayedComponent, clearDisplayedComponents, navigate, removeDisplayedComponent } from "./invest-scope.actions";

export interface InvestScopeState {
  displayedComponents: InvestScopeDisplayedElement[];
  navigation: 'prospections' | 'sellers';
}

export const investScopeReducer = createReducer<InvestScopeState>(
  {
    displayedComponents: [],
    navigation: 'prospections'
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
  on(navigate, (state, { navigation }) => ({
    ...state,
    navigation: navigation
  }))
);
