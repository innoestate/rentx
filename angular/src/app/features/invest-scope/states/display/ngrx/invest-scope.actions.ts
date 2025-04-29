import { createAction, props } from "@ngrx/store";
import { InvestScopeDisplayedElement } from "../../../models/invest-scope.display-map.model";
import { Prospection } from "src/app/features/prospections/models/prospection.model";
import { InvestScopeNavigation } from "../../../models/invest-scope.navigation.model";

export const clearDisplayedComponents = createAction('[Invest-scope] Clear displayed components');
export const addDisplayedComponent = createAction('[Invest-scope] Add displayed element', props<{ component : InvestScopeDisplayedElement}>());
export const removeDisplayedComponent = createAction('[Invest-scope] Remove displayed element', props<{ component : string}>());

export const selectItem = createAction('[Invest-scope] Select item', props<{ item : Prospection | null}>())

export const navigate = createAction('[Invest-scope] Navigate', props<{ navigation :  InvestScopeNavigation }>());