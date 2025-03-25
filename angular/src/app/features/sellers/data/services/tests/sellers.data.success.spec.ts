import { TestBed } from "@angular/core/testing";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { cloneDeep } from "lodash";
import { DataNgrxService } from "src/app/shared/data/ngrx/data.ngrx.service";
import { SellersHttpService } from "../../http/sellers.http.service";
import { SellersDataModule } from "../../modules/sellers.data.module";
import { SellersDataService } from "../sellers.data.service";
import { sellerDtoMock1, sellerDtoMock2 } from "../../../mocks/sellers.dto.mock";
import { SellersHttpSuccessMockService } from "../../../mocks/sellers.http.success.mock.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('SellersDataService test successful CRUD ', () => {

  let dataService: SellersDataService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SellersDataModule
      ],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        DataNgrxService,
        SellersDataService,
        {
          provide: SellersHttpService,
          useClass: SellersHttpSuccessMockService
        }
      ]
    });
    store = TestBed.inject(Store);
    dataService = TestBed.inject(SellersDataService);
  });

  it('should load sellers and emit the sellers from signals', () => {
    const sellers = dataService.getSellers();
    expect(sellers()).toEqual([]);
    dataService.loadSellers();
    expect(sellers().length).toEqual(3);
  });

  it('should add a new seller', () => {
    dataService.loadSellers();
    const newSeller = sellerDtoMock1;
    dataService.createSeller(newSeller);
    const sellers = dataService.getSellers();
    expect(sellers().length).toEqual(4);
  });

  it('should update a seller', () => {
    dataService.loadSellers();
    const updatedSeller = { ...cloneDeep(sellerDtoMock1), name: 'Updated Name' };
    dataService.updateSeller(updatedSeller);
    const sellers = dataService.getSellers();
    expect(sellers().find(s => s.id === updatedSeller.id)!.name).toEqual('Updated Name');
  });

  // it('should delete a seller', () => {
  //   dataService.loadSellers();
  //   const sellerIdToDelete = sellerDtoMock2.id;
  //   dataService.deleteSeller(sellerIdToDelete!);
  //   const sellers = dataService.getSellers();
  //   expect(sellers().find(s => s.id === sellerIdToDelete)).toBeUndefined();
  // });

});
