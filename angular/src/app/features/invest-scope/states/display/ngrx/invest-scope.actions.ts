import { createAction, props } from "@ngrx/store";
import { InvestScopeDisplayedElement } from "../../../models/invest-scope.display-map.model";

export const clearDisplayedComponents = createAction('[Invest-scope] Clear displayed components');
export const addDisplayedComponent = createAction('[Invest-scope] Add displayed element', props<{ component : InvestScopeDisplayedElement}>());
export const removeDisplayedComponent = createAction('[Invest-scope] Remove displayed element', props<{ component : string}>());

export const navigate = createAction('[Invest-scope] Navigate', props<{ navigation :  'prospections' | 'sellers' }>());