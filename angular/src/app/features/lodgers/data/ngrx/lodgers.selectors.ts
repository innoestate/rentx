import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Lodger } from "../../models/lodger.model";
import { State } from "./lodgers.reducers";


export const lodgersSelector =  createFeatureSelector<State>('lodgers');

export const selectLodgers = createSelector(
    lodgersSelector,
    (state) => (state.lodgers) as Lodger[]
)


