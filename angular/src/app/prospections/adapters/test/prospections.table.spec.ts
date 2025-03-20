import { TestBed } from "@angular/core/testing"
import { ProspectionsTableAdapter } from "../prospections.table.adapter"
import { UiTableAdapterTestHelper } from "src/app/ui/components/ui-table/adapter/test/helper/ui-table.adapter.test.helper"
import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { ProspectionsCommandsService } from "../../commands/prospections.commands.service"
import { ProspectionsCommandsMockService } from "../../commands/test/mock/prospections.commands.mock.service"
import { ProspectionDtoMock1 } from "../../test/mocks/prospections.dto.mock"
import { sellerMock1 } from "../../test/mocks/sellers.dto.mock"

describe('ProspectionsTableAdapter', () => {

  let adapter: ProspectionsTableAdapter

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        ProspectionsTableAdapter,
        {
          provide: ProspectionsCommandsService,
          useClass: ProspectionsCommandsMockService
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
