import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Owner } from "../../../core/models/owner.model";
import { State } from "./owners.reducers";


export const ownersSelector =  createFeatureSelector<State>('owners');

export const selectOwners = createSelector(
    ownersSelector,
    (state) => (state?.owners??[]) as Owner[]
)


