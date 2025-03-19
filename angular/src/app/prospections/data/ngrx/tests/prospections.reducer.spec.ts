import { prospectionReducer, initialState, ProspectionState } from '../prospections.reducer';
import {
  createProspectionSuccess,
  loadProspectionsSuccess,
  reloadProspection,
  deleteProspectionSuccess,
  updateProspectionSuccess
} from '../prospections.actions';
import { Prospection_Dto } from 'src/app/prospections/models/prospection.dto.model';
import { ProspectionDtoMock1, ProspectionDtoMock2 } from '../../test/mocks/prospections.dto.mock';


describe('Prospection Reducer', () => {
  it('should return the default state', () => {
    const state = prospectionReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should load prospections', () => {
    const prospections: Prospection_Dto[] = [{ ...ProspectionDtoMock1 }];
    const state = prospectionReducer(initialState, loadProspectionsSuccess({ prospections }));
    expect(state.prospections).toEqual(prospections);
  });

  it('should add a new prospection', () => {
    const prospection: Prospection_Dto = { ...ProspectionDtoMock2 };
    const state = prospectionReducer(initialState, createProspectionSuccess({ prospection }));
    expect(state.prospections).toContain(prospection);
  });

  it('should delete a prospection', () => {
    const initialStateWithProspections: ProspectionState = {
      prospections: [{ ...ProspectionDtoMock1 }]
    };
    const state = prospectionReducer(initialStateWithProspections, deleteProspectionSuccess({ id: ProspectionDtoMock1.id! }));
    expect(state.prospections.length).toBe(0);
  });

  it('should update a prospection', () => {
    const initialStateWithProspections: ProspectionState = {
      prospections: [{ ...ProspectionDtoMock1 }]
    };
    const updatedProspection: Partial<Prospection_Dto> = { id: ProspectionDtoMock1.id, city: 'London' };
    const state = prospectionReducer(initialStateWithProspections, updateProspectionSuccess({ prospection: updatedProspection }));
    expect(state.prospections[0].city).toBe('London');
  });

  it('should reload a prospection', () => {
    const initialStateWithProspections: ProspectionState = {
      prospections: [{ ...ProspectionDtoMock1 }]
    };
    const state = prospectionReducer(initialStateWithProspections, reloadProspection({ prospectionId: ProspectionDtoMock1.id! }));
    expect(state.prospections.length).toBe(1);
  });
});
