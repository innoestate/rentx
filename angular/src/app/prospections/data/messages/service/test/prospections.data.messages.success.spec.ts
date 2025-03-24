import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { EffectsModule } from "@ngrx/effects"
import { Store, StoreModule } from "@ngrx/store"
import { cloneDeep } from "lodash"
import { DataNgrxService } from "src/app/core/data/ngrx/data.ngrx.service"
import { LocalizationsService } from "src/app/core/localizations/localizations.service"
import { MessageTestHelper } from "src/app/ui/services/message/test/message.test.helper"
import { ProspectionDtoMock1, ProspectionDtoMock3, ProspectionDtoMock4 } from "../../../../test/mocks/prospections.dto.mock"
import { ProspectionsHttpService } from "../../../http/prospections.http.service"
import { ProspectionsDataModule } from "../../../module/prospections.data.module"
import { ProspectionsDataService } from "../../../service/prospections.data.service"
import { ProspectionHttpMockService } from "../../../service/test/service/prospection.http.success.mock.service"
import { MessageModuleInitializer } from "./mock/message.module.initializer"

describe('ProspectionsDataMessagesService test successful CRUD displaying messages ', () => {

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
        MessageModuleInitializer
      ],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        DataNgrxService,
        ProspectionsDataService,
        {
          provide: ProspectionsHttpService,
          useClass: ProspectionHttpMockService
        }
      ]
    })
    store = TestBed.inject(Store);
    dataService = TestBed.inject(ProspectionsDataService);
    localizationService = TestBed.inject(LocalizationsService);
    dataService.loadProspections();

  })

  it('should add a new prospection and show success message', () => {
    dataService.createProspection(cloneDeep(ProspectionDtoMock4));
    messageTestHelper.hasDisplaySuccessMessage(localizationService.getLocalization('prospections','addProspectionSuccess'));
  })

  it('should update a prospection and show success message', () => {
    dataService.updateProspection({...cloneDeep(ProspectionDtoMock1), city: 'Las Vegas'});
    messageTestHelper.hasDisplaySuccessMessage(localizationService.getLocalization('prospections','updateProspectionSuccess'));
  })

  it('should delete a prospection and show success message', () => {
    dataService.deleteProspection(ProspectionDtoMock3.id!);
    messageTestHelper.hasDisplaySuccessMessage(localizationService.getLocalization('prospections','deleteProspectionSuccess'));
  })


})
