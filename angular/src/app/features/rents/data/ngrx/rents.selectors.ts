import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State as RentsStore } from "./rents.reducer";
import { Rent } from "../../models/rent.model";
import { State as RentsState } from "./rents.reducer";
import { EstateRents } from "../../models/estate.rents.model";

export const rentsSelector = createFeatureSelector<RentsStore>('rents');


export const selectMonthlyRents = createSelector(
  rentsSelector,
  (state: RentsState): EstateRents[] => {
    return state.monthlyRents_Dto;
  }
);
