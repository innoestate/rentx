import { createReducer, on } from "@ngrx/store";
import { MonthlyRents_Dto } from "../../../core/models/dtos/monthly-rents.dto.model";
import { loadMonthlyRentsSuccess } from "./rents.actions";

export interface State {
  monthlyRents_Dto: MonthlyRents_Dto[];
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
