import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { UiTableAdapterTestHelper } from "src/app/ui/components/ui-table/adapter/test/helper/ui-table.adapter.test.helper";
import { sellerDtoMock1 } from "../mocks/sellers.dto.mock";
import { uiTableRowSellersUpdateMock1 } from "./mocks/sellers.table.row.mock";
import { SellersTableAdapterService } from "./sellers.table.adapter.service";


describe('SellersTableAdapterService', () => {

  let adapter: SellersTableAdapterService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        SellersTableAdapterService
      ]
    });
    adapter = TestBed.inject(SellersTableAdapterService);
  });

  it('should pass all basic table adapter tests', () => {
    const adapterTestHelper = new UiTableAdapterTestHelper(adapter, [{...sellerDtoMock1}], []);
    adapterTestHelper.testTable();
  });

  it('should provide the correct address Dto object for update', () => {
    const dto = adapter.getDtoFromRow(uiTableRowSellersUpdateMock1);
    expect(dto).toEqual({
      id: '5678',
      address: '123 test street'
    });
  });

  it('should throw an error because no id', () => {
    expect(() => {
      adapter.getDtoFromRow({ data: {}, cells: {}} as any);
    }).toThrow();
  })


});
