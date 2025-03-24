import { cloneDeep } from "lodash";
import { ProspectionDtoMock1 } from "../../mocks/prospections.dto.mock";
import { ProspectionsDataAdapter } from "./prospections.data.adapter.service";

describe('Prospections Data Adapter', () => {

  it('should return a prospection without seller_id field', () => {
    const prospection = {...cloneDeep(ProspectionDtoMock1), seller_id: ''};
    const prospectionDto = ProspectionsDataAdapter.formatToDto(prospection);
    expect(prospectionDto.seller_id).toBeUndefined();
  });

  it('should return a prospection with a seller_id field', () => {
    const prospection = {...cloneDeep(ProspectionDtoMock1), seller_id: '123'};
    const prospectionDto = ProspectionsDataAdapter.formatToDto(prospection);
    expect(prospectionDto.seller_id).toEqual('123');
  })

});
