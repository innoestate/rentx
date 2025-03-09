import { createReducer, on } from "@ngrx/store";
import { Lodger } from "../../models/lodger.model";
import { createLodgerSuccess, deleteLodgerSuccess, loadLodgersSuccess, updateLodgerSuccess } from "./lodgers.actions";

export interface State {
  lodgers: Lodger[];
}

export const initialState: State = {
  lodgers: []
};

export const lodgersReducer = createReducer(
  initialState,
  on(loadLodgersSuccess, (state, {lodgers}) => {
    return {
      ...state,
      lodgers
    }
  }),
  on(createLodgerSuccess, (state, {lodger}) => {
    return {
      ...state,
      lodgers: state.lodgers.concat(lodger)
    }
  }),
  on(updateLodgerSuccess, (state, {lodger}) => {
    return {
      ...state,
      lodgers: state.lodgers.map(actualLodger => actualLodger.id === lodger.id ? {...actualLodger, ...lodger} : actualLodger)
    }
  }),
  on(deleteLodgerSuccess, (state, { lodgerId }) => {
    return {
      ...state,
      lodgers: state.lodgers.filter(lodger => lodger.id !== lodgerId),
    }
  })
)
