import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./estates.reducers";


export const estatesSelector =  createFeatureSelector<State>('estates');

export const selectEstates = createSelector(
    estatesSelector,
    (state) => state.estates//.map(estate => formatEstate(estate))
)
