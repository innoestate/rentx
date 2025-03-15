import { TestBed } from "@angular/core/testing"

import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { EffectsModule } from "@ngrx/effects"
import { Store, StoreModule } from "@ngrx/store"
import { ProspectionsHttpService } from "../http/prospections.http.service"
import { ProspectionsDataModule } from "../module/prospections.data.module"
import { ProspectionsDataService } from "../service/prospections.data.service"
import { ProspectionHttpMockService } from "./service/prospection.http.mock.service"

describe('ProspectionsDataMessageService', () => {

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
        {
          provide: ProspectionsHttpService,
          useClass: ProspectionHttpMockService
        }
      ]
    })
    store = TestBed.inject(Store);
    dataService = TestBed.inject(ProspectionsDataService)

  })

  it('should display a success message after loading', async () => {

  })


})