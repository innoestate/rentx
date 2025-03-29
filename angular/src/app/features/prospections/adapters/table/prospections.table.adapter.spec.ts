import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { sellerDtoMock1 } from "src/app/features/sellers/mocks/sellers.dto.mock"
import { UiTableAdapterTestHelper } from "src/app/ui/components/ui-table/adapter/test/helper/ui-table.adapter.test.helper"
import { prospectionDtoMock1 } from "../../mocks/prospections.dto.mock"
import { uiTableRowProspectionsUpdateMock1 } from "./mocks/prospection.table.row.mock"
import { ProspectionsTableAdapterService } from "./prospections.table.adapter.service"

describe('ProspectionsTableAdapterService', () => {

  let adapter: ProspectionsTableAdapterService

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        ProspectionsTableAdapterService
      ]
    });
    adapter = TestBed.inject(ProspectionsTableAdapterService);
  })

  it('should pass all basic table adapter tests', () => {
    const adapterTestHelper = new UiTableAdapterTestHelper(adapter, [{...prospectionDtoMock1}], [{...sellerDtoMock1}]);
    adapterTestHelper.testTable();
  })

  it('should provide the correct Dto object for update', () => {
    const dto = adapter.getDtoFromRow(uiTableRowProspectionsUpdateMock1);
    expect(dto).toEqual({
      seller_id: 'abcd'
    })
  })

})
