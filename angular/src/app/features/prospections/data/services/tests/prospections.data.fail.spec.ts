import { TestBed } from "@angular/core/testing"
import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { EffectsModule } from "@ngrx/effects"
import { Store, StoreModule } from "@ngrx/store"
import { catchError, of, take } from "rxjs"
import { DataNgrxService } from "src/app/shared/data/ngrx/data.ngrx.service"
import { ProspectionsHttpService } from "../../http/prospections.http.service"
import { ProspectionsDataModule } from "../../modules/prospections.data.module"
import { ProspectionsDataService } from "../prospections.data.service"
import { ProspectionHttpFailMockService } from "../../../mocks/prospections.http.fail.mock.service"
import { prospectionDtoMock1 } from "../../../mocks/prospections.dto.mock"

describe('ProspectionsDataService test faillure CRUD ', () => {

  let dataService: ProspectionsDataService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        ProspectionsDataModule
      ],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        DataNgrxService,
        ProspectionsDataService,
        {
          provide: ProspectionsHttpService,
          useClass: ProspectionHttpFailMockService
        }
      ]
    })
    store = TestBed.inject(Store);
    dataService = TestBed.inject(ProspectionsDataService)

  })

  it('should fail to load prospections', (done) => {

    dataService.loadProspections().pipe(
      take(1),
      catchError(err => {
        expect(err).toBeTruthy();
        done();
        return of(null);
      })
    ).subscribe();

  })

  it('should fail to create prospection', (done) => {
    dataService.createProspection({...prospectionDtoMock1}).pipe(
      take(1),
      catchError(err => {
        expect(err).toBeTruthy();
        done();
        return of(null);
      })
    ).subscribe();
  });

  it('should fail to update prospection', (done) => {
    dataService.updateProspection({}).pipe(
      take(1),
      catchError(err => {
        expect(err).toBeTruthy();
        done();
        return of(null);
      })
    ).subscribe();
  });

  it('should fail to delete prospection', (done) => {
    dataService.deleteProspection('1').pipe(
      take(1),
      catchError(err => {
        expect(err).toBeTruthy();
        done();
        return of(null);
      })
    ).subscribe();
  });

})
