import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State as EstateState} from "./estates.reducers";
import { State as OwnerState } from "../owner/owners.reducers";
import { State as LodgerState } from "../lodger/lodgers.reducers";
import { Estate } from "../../models/estate.model";
import { formatEstateDtoToEstateUx } from "../../utils/estate.utils";


export const estatesSelector = createFeatureSelector<EstateState>('estates');
export const ownersSelector = createFeatureSelector<OwnerState>('owners');
export const lodgersSelector = createFeatureSelector<LodgerState>('lodgers');

export const selectEstates = createSelector(
  estatesSelector,
  ownersSelector,
  lodgersSelector,
  (estateState, ownerState, lodgerState): Estate[] => {
    return estateState.estates.map(estate => formatEstateDtoToEstateUx(estate, ownerState.owners, lodgerState.lodgers));
  }
);
