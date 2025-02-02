import { createReducer, on } from '@ngrx/store';
import { Prospection } from '../../models/prospection.model';
import {
  createProspection,
  createProspectionSuccess,
  loadProspectionsSuccess,
  removeProspectionSuccess,
  setProspectionFilters,
  updateProspectionSuccess
} from './prospections.actions';
import { ProspectionsFilters } from '../../models/prospections.filters';

export interface ProspectionState {
  prospections: Prospection[];
  filters: ProspectionsFilters;
}

export const initialState: ProspectionState = {
  prospections: [],
  filters: {
    status: [],
    city: []
  }
};

export const prospectionReducer = createReducer(
  initialState,
  on(loadProspectionsSuccess, (state, { prospections }) => {
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
  })),
  on(setProspectionFilters, (state, { filters }) => ({
    ...state,
    filters
  }))
);
