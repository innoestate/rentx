import { selectProspectionsState, selectProspections } from '../prospections.selectors';
import { ProspectionsState } from '../prospections.reducers';
import { prospectionDtoMock1, prospectionDtoMock2 } from '../../../mocks/prospections.dto.mock';

describe('Prospections ngrx Selectors', () => {
  const initialState: ProspectionsState = {
    prospections: [
      { ...prospectionDtoMock1 },
      { ...prospectionDtoMock2 }
    ]
  };

  it('should select the feature state', () => {
    const result = selectProspectionsState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select the prospections', () => {
    const result = selectProspections.projector(initialState);
    expect(result).toEqual(initialState.prospections);
  });

  it('should reflect updated prospection in the selected prospections', () => {
    const updatedProspection = { ...prospectionDtoMock1, city: 'Strassburg' };
    const updatedState: ProspectionsState = {
      prospections: [
        updatedProspection,
        { ...prospectionDtoMock2 }
      ]
    };
    const result = selectProspections.projector(updatedState);
    expect(result[0].city).toBe('Strassburg');
  });
});
