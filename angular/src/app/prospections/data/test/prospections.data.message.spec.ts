import { fakeAsync, TestBed, tick } from "@angular/core/testing"

import { ProspectionsHttpService } from "../http/prospections.http.service"
import { ProspectionsDataModule } from "../module/prospections.data.module"
import { ProspectionsDataService } from "../service/prospections.data.service"
import { ProspectionHttpMockService } from "./service/prospection.http.mock.service"
import { Store, StoreModule } from "@ngrx/store"
import { EffectsModule } from "@ngrx/effects"

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
        {
          provide: ProspectionsHttpService,
          useClass: ProspectionHttpMockService
        }
      ]
    })
    store = TestBed.inject(Store);
    dataService = TestBed.inject(ProspectionsDataService)

  })

  it('should display a success message after loading', fakeAsync(async () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    await dataService.loadProspections();
    expect(dispatchSpy).toHaveBeenCalled();
    // tick(500);
    // expect(dataService.getProspections().length).toBe(3);

  }))


})