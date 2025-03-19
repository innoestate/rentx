import { selectProspectionState, selectProspections } from '../prospections.selectors';
import { ProspectionState } from '../prospections.reducer';
import { ProspectionDtoMock1, ProspectionDtoMock2 } from '../../test/mocks/prospections.dto.mock';

describe('Prospection Selectors', () => {
  const initialState: ProspectionState = {
    prospections: [
      { ...ProspectionDtoMock1 },
      { ...ProspectionDtoMock2 }
    ]
  };

  it('should select the feature state', () => {
    const result = selectProspectionState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select the prospections', () => {
    const result = selectProspections.projector(initialState);
    expect(result).toEqual(initialState.prospections);
  });

  it('should reflect updated prospection in the selected prospections', () => {
    const updatedProspection = { ...ProspectionDtoMock1, city: 'Strassburg' };
    const updatedState: ProspectionState = {
      prospections: [
        updatedProspection,
        { ...ProspectionDtoMock2 }
      ]
    };
    const result = selectProspections.projector(updatedState);
    expect(result[0].city).toBe('Strassburg');
  });
});
