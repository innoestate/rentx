import { TestBed } from "@angular/core/testing";
import { EstatesCommandsProvider } from "../../../commands/estates.commands.provider";
import { EstatesCommandsProviderMock } from "../../../commands/test/mock.estates.commands.provider.mock";
import { EstatesUiTableAdapter } from "../estates.table.adapter";
import { estate1Mock, estate2Mock } from "./mocks/estates.mock";
import { owner1Mock, owner2Mock } from "./mocks/owners.mock";
import { estatesColumnItems } from "../estates.table.columns";
import { cloneDeep } from "lodash";

describe('EstatesTableAdapter test usage of table adapter', () => {

  let estatesUiTableAdapter: EstatesUiTableAdapter;
  const estatesColumns = cloneDeep(estatesColumnItems);

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        EstatesCommandsProvider,
        EstatesUiTableAdapter,
        { provide: EstatesCommandsProvider, useClass: EstatesCommandsProviderMock }
      ]
    });
    estatesUiTableAdapter = TestBed.inject(EstatesUiTableAdapter);

  });

  it('should create an instance of EstatesBusiness', () => {
    expect(estatesUiTableAdapter).toBeTruthy();
  });

  // it('should have the sames number of columns as expected for estates table', () => {
  //   const { columns } = estatesUiTableAdapter.buildTableList([estate1Mock, estate2Mock], [owner1Mock, owner2Mock]);
  //   expect(columns.length).toBe(estatesColumns.length);
  // })

  // it('should retreive the good estate from a row of the table', () => {
  //   const { rows } = estatesUiTableAdapter.buildTableList([estate1Mock, estate2Mock], [owner1Mock, owner2Mock]);
  //   const estate = estatesUiTableAdapter.extractEstateFromRow([estate1Mock, estate2Mock], rows[0]);
  //   expect(estate).toEqual(estate1Mock);
  // })

  // it('should retreive the edited plot field in the extracted estate from the table rows', () => {
  //   const { rows } = estatesUiTableAdapter.buildTableList([estate1Mock, estate2Mock], [owner1Mock, owner2Mock]);
  //   const updatedRow = { ...rows[0], plot: 'updatedPlot' };
  //   const estate = estatesUiTableAdapter.extractEstateFromRow([estate1Mock, estate2Mock], updatedRow);
  //   const expectedEstate = { ...estate1Mock, plot: 'updatedPlot' } as any;
  //   expect(estate).toEqual(expectedEstate);
  // })

})
