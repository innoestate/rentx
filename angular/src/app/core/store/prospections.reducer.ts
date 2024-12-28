import { createReducer, on } from '@ngrx/store';
import { Prospection } from '../models/prospection.model';
import { 
  createProspection, 
  createProspectionSuccess, 
  loadProspectionsSuccess, 
  removeProspectionSuccess, 
  updateProspectionSuccess 
} from './prospections.actions';

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
  on(createProspectionSuccess, (state, { prospection }) => ({
    ...state,
    prospections: [...state.prospections, prospection]
  })),
  on(removeProspectionSuccess, (state, { id }) => ({
    ...state,
    prospections: state.prospections.filter(prospection => prospection.id !== id)
  })),
  on(updateProspectionSuccess, (state, { id, changes }) => ({
    ...state,
    prospections: state.prospections.map(prospection =>
      prospection.id === id ? { ...prospection, ...changes } : prospection
    )
  }))
);
