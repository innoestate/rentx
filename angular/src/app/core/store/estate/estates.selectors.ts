import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./estates.reducers";
import { formatEstateDtoToEstateUx } from "../../utils/estate.utils";


export const estatesSelector =  createFeatureSelector<State>('estates');

export const selectEstates = createSelector(
    estatesSelector,
    (state) => state.estates.map(estate => formatEstateDtoToEstateUx(estate))
)
