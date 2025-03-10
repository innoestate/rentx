import { createReducer, on } from '@ngrx/store';
import { Prospection_Dto } from '../../models/prospection.dto.model';
import {
  createProspectionSuccess,
  loadProspectionsSuccess,
  reloadProspection,
  removeProspectionSuccess,
  updateProspectionSuccess
} from './prospections.actions';

export interface ProspectionState {
  prospections: Prospection_Dto[];
}

export const initialState: ProspectionState = {
  prospections: []
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
  on(updateProspectionSuccess, (state, { prospection }) => {
    return {
      ...state,
      prospections: state.prospections.map(actualProspection =>
        actualProspection.id === prospection.id ? { ...actualProspection, ...prospection } : actualProspection
      )
    };
  }),
  on(reloadProspection, (state, { prospectionId }) => ({
    ...state,
    prospections: state.prospections.map(actualProspection =>
      actualProspection.id === prospectionId ? { ...actualProspection, isReloaded: true } : actualProspection
    )
  }))
);
