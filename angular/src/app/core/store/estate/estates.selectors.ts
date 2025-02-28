import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Estate } from "../../models/estate.model";
import { formatEstatesDtoToEstateUx } from "../../utils/estate.utils";
import { State as LodgerState } from "../lodger/lodgers.reducers";
import { State as OwnerState } from "../owner/owners.reducers";
import { State as RentsStore } from "../rents/rents.reducer";
import { State as EstateState } from "./estates.reducers";
import { ownersSelector } from "../owner/owners.selectors";


export const estatesSelector = createFeatureSelector<EstateState>('estates');
export const lodgersSelector = createFeatureSelector<LodgerState>('lodgers');
export const rentsSelector = createFeatureSelector<RentsStore>('rents');

export const selectEstates = createSelector(
  estatesSelector,
  ownersSelector,
  lodgersSelector,
  rentsSelector,
  (estateState, ownerState, lodgerState, rentsState): Estate[] => {
    return formatEstatesDtoToEstateUx(estateState.estates, ownerState.owners, lodgerState.lodgers, rentsState.monthlyRents_Dto);
  }
);
