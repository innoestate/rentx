import { createReducer, on } from "@ngrx/store";
import { EstateRents } from "../../models/estate.rents.model";
import { loadMonthlyRentsSuccess } from "./rents.actions";

export interface State {
  monthlyRents_Dto: EstateRents[];
}

export const initialState: State = {
  monthlyRents_Dto: []
};

export const rentsReducer = createReducer(
  initialState,
  on(loadMonthlyRentsSuccess, (state, data) => {
    return {
      monthlyRents_Dto: data.monthlyRents
    }
  })
);
