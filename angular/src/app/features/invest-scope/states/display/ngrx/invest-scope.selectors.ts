import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InvestScopeState } from "./invest-scope.reducers";

export const selectInvestScopeState = createFeatureSelector<InvestScopeState>('investScope');

export const onInvestScopeDisplayedComponents = createSelector(
  selectInvestScopeState,
  (state: InvestScopeState) => state.displayedComponents
)

export const onInvestScopeNavigation = createSelector(
  selectInvestScopeState,
  (state: InvestScopeState) => state.navigation
)

export const onInvestScopeSelectedItem = createSelector(
  selectInvestScopeState,
  (state: InvestScopeState) => state.selectedItem
)