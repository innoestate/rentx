import { TestBed } from "@angular/core/testing";
import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { catchError, of, take } from "rxjs";
import { DataNgrxService } from "src/app/shared/data/ngrx/data.ngrx.service";
import { SellersHttpService } from "../../http/sellers.http.service";
import { SellersDataModule } from "../../modules/sellers.data.module";
import { SellersDataService } from "../sellers.data.service";
import { sellerDtoMock1 } from "../../../mocks/sellers.dto.mock";
import { SellerHttpFailMockService } from "../../../mocks/sellers.http.fail.mock.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('SellersDataService test failure CRUD', () => {
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
          useClass: SellerHttpFailMockService
        }
      ]
    });
    store = TestBed.inject(Store);
    dataService = TestBed.inject(SellersDataService);
  });

  it('should fail to load sellers', (done) => {
    dataService.loadSellers().pipe(
      take(1),
      catchError(err => {
        expect(err).toBeTruthy();
        done();
        return of(null);
      })
    ).subscribe();
  });

  it('should fail to create seller', (done) => {
    dataService.createSeller({ ...sellerDtoMock1 }).pipe(
      take(1),
      catchError(err => {
        expect(err).toBeTruthy();
        done();
        return of(null);
      })
    ).subscribe();
  });

  it('should fail to update seller', (done) => {
    dataService.updateSeller('1',{}).pipe(
      take(1),
      catchError(err => {
        expect(err).toBeTruthy();
        done();
        return of(null);
      })
    ).subscribe();
  });

  it('should fail to delete seller', (done) => {
    dataService.deleteSeller('1').pipe(
      take(1),
      catchError(err => {
        expect(err).toBeTruthy();
        done();
        return of(null);
      })
    ).subscribe();
  });
});
