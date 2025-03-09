import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Estate } from "../../models/estate.model";
import { formatEstatesDtoToEstateUx } from "./estate.utils";
import { State as EstatesState } from "./estates.reducers";
import { ownersSelector } from "../../../owners/data/ngrx/owners.selectors";
import { State as LodgerState } from "../../../lodgers/data/ngrx/lodgers.reducers";
import { State as RentsStore } from "../../../rents/data/ngrx/rents.reducer";


export const estatesSelector = createFeatureSelector<EstatesState>('estates');
export const lodgersSelector = createFeatureSelector<LodgerState>('lodgers');
export const rentsSelector = createFeatureSelector<RentsStore>('rents');

export const selectEstates = createSelector(
  estatesSelector,
  ownersSelector,
  lodgersSelector,
  rentsSelector,
  (estateState, ownerState, lodgerState, rentsState): Estate[] => {
    return formatEstatesDtoToEstateUx(estateState.estates??[], ownerState.owners, lodgerState.lodgers, rentsState.monthlyRents_Dto);
  }
);
