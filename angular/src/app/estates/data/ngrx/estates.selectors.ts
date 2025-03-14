import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Estate_Dto } from "../../models/estate.dto.model";
import { State as EstatesState } from "./estates.reducers";

export const estatesSelector = createFeatureSelector<EstatesState>('estates');

export const selectEstates = createSelector(
  estatesSelector,
  (estateState): Estate_Dto[] => {
    return estateState.estates;
  }
);