import { createReducer, on } from "@ngrx/store";
import { Lodger } from "../../models/lodger.model";
import { createLodgerSuccess, deleteLodgerSuccess, loadLodgersSuccess } from "./lodgers.actions";

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
  on(deleteLodgerSuccess, (state, { lodgerId }) => {
    return {
      ...state,
      owners: state.lodgers.filter(lodger => lodger.id !== lodgerId),
    }
  })
)
