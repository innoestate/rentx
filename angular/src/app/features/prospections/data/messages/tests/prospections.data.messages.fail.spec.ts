import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { EffectsModule } from "@ngrx/effects"
import { Store, StoreModule } from "@ngrx/store"
import { cloneDeep } from "lodash"
import { catchError, of, take } from "rxjs"
import { DataNgrxService } from "src/app/shared/data/ngrx/data.ngrx.service"
import { LocalizationsService } from "src/app/core/localizations/localizations.service"
import { MessageTestHelper } from "src/app/ui/services/message/test/message.test.helper"
import { ProspectionsDataMessagesModuleInitializer } from "./mocks/prospections.data.messages.module.initializer"
import { ProspectionsDataModule } from "../../modules/prospections.data.module"
import { ProspectionsDataService } from "../../services/prospections.data.service"
import { ProspectionsHttpService } from "../../http/prospections.http.service"
import { ProspectionHttpFailMockService } from "../../../mocks/prospections.http.fail.mock.service"
import { prospectionDtoMock1, prospectionDtoMock3 } from "src/app/features/prospections/mocks/prospections.dto.mock"

describe('ProspectionsDataMessagesService test fail CRUD displaying messages ', () => {

  let dataService: ProspectionsDataService;
  let store: Store;
  let messageTestHelper = new MessageTestHelper();
  let localizationService: LocalizationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        ProspectionsDataModule,
        ProspectionsDataMessagesModuleInitializer
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
    dataService = TestBed.inject(ProspectionsDataService);
    localizationService = TestBed.inject(LocalizationsService);

  })

  it('should add a new prospection and show fail message', done => {
    dataService.loadProspections().pipe(
      take(1),
      catchError(() => {
        messageTestHelper.isDisplayingFailMessage(localizationService.getLocalization('prospections','failLoading'));
        done();
        return of(null);
      })
    ).subscribe();
  })

  it('should fail to add a new Prospection and show error message', done => {
    dataService.createProspection(cloneDeep(prospectionDtoMock1)).pipe(
      take(1),
      catchError(() => {
        messageTestHelper.isDisplayingFailMessage(localizationService.getLocalization('prospections','addProspectionFailure'));
        done();
        return of(null);
      })
    ).subscribe();
  })

  it('should fail to update a prospection and show error message', done => {
    dataService.updateProspection({...cloneDeep(prospectionDtoMock1), city: 'Las Vegas'}).pipe(
      take(1),
      catchError(() => {
        messageTestHelper.isDisplayingFailMessage(localizationService.getLocalization('prospections','updateProspectionFailure'));
        done();
        return of(null);
      })
    ).subscribe();
  })

  it('should fail to delete a prospection and show error message', done => {
    dataService.deleteProspection(prospectionDtoMock3.id!).pipe(
      take(1),
      catchError(() => {
        messageTestHelper.isDisplayingFailMessage(localizationService.getLocalization('prospections','deleteProspectionFailure'));
        done();
        return of(null);
      })
    ).subscribe();
  })

})
