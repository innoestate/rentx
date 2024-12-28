import { createReducer, on } from '@ngrx/store';
import { Prospection } from '../models/prospection.model';
import { createProspection, loadProspectionsSuccess } from './prospections.actions';

export interface ProspectionState {
  prospections: Prospection[];
}

export const initialState: ProspectionState = {
  prospections: []
};

export const prospectionReducer = createReducer(
  initialState,
  on(loadProspectionsSuccess, (state, { prospections }) => {

    console.log('prospections', prospections);

    return {
      ...state,
      prospections
    };

  }),
  on(createProspection, (state, { prospection }) => ({
    ...state,
    prospections: [...state.prospections, prospection]
  }))
);
