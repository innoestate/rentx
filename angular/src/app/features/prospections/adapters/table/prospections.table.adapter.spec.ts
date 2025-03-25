import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { UiTableAdapterTestHelper } from "src/app/ui/components/ui-table/adapter/test/helper/ui-table.adapter.test.helper"
import { ProspectionsCommandsService } from "../../commands/prospections.commands.service"
import { prospectionDtoMock1 } from "../../mocks/prospections.dto.mock"
import { ProspectionsTableAdapterService } from "./prospections.table.adapter.service"
import { uiTableRowProspectionsUpdateMock1 } from "./mocks/prospection.table.row.mocl"
import { sellerMock1 } from "src/app/features/sellers/mocks/sellers.dto.mock"

describe('ProspectionsTableAdapterService', () => {

  let adapter: ProspectionsTableAdapterService

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        ProspectionsTableAdapterService,
        {
          provide: ProspectionsCommandsService,
        }
      ]
    });
    adapter = TestBed.inject(ProspectionsTableAdapterService);
  })

  it('should pass all basic table adapter tests', () => {
    const adapterTestHelper = new UiTableAdapterTestHelper(adapter, [{...prospectionDtoMock1}], [{...sellerMock1}]);
    adapterTestHelper.testTable();
  })

  it('should provide the correct Dto object for update', () => {
    const dto = adapter.getDtoFromRow(uiTableRowProspectionsUpdateMock1);
    expect(dto).toEqual({
      id: '1234',
      seller_id: 'abcd'
    })
  })


})
