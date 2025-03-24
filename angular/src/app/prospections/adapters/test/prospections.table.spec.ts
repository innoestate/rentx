import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { UiTableAdapterTestHelper } from "src/app/ui/components/ui-table/adapter/test/helper/ui-table.adapter.test.helper"
import { ProspectionsCommandsService } from "../../commands/prospections.commands.service"
import { ProspectionDtoMock1 } from "../../test/mocks/prospections.dto.mock"
import { sellerMock1 } from "../../test/mocks/sellers.dto.mock"
import { ProspectionsTableAdapter } from "../prospections.table.adapter"

describe('ProspectionsTableAdapter', () => {

  let adapter: ProspectionsTableAdapter

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        ProspectionsTableAdapter,
        {
          provide: ProspectionsCommandsService,
        }
      ]
    });
    adapter = TestBed.inject(ProspectionsTableAdapter);
  })

  it('should pass all basic table adapter tests', () => {
    const adapterTestHelper = new UiTableAdapterTestHelper(adapter, [{...ProspectionDtoMock1}], [{...sellerMock1}]);
    adapterTestHelper.testTable();
  })


})
