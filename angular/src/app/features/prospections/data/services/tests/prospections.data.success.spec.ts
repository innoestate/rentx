import { TestBed } from "@angular/core/testing"
import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { EffectsModule } from "@ngrx/effects"
import { Store, StoreModule } from "@ngrx/store"
import { cloneDeep } from "lodash"
import { DataNgrxService } from "src/app/shared/data/ngrx/data.ngrx.service"
import { ProspectionsHttpService } from "../../http/prospections.http.service"
import { ProspectionsDataModule } from "../../modules/prospections.data.module"
import { ProspectionsDataService } from "../prospections.data.service"
import { prospectionDtoMock3, prospectionDtoMock4 } from "../../../mocks/prospections.dto.mock"
import { ProspectionsHttpSuccessMockService } from "../../../mocks/prospections.http.success.mock.service"

describe('ProspectionsDataService test successful CRUD ', () => {

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
          useClass: ProspectionsHttpSuccessMockService
        }
      ]
    })
    store = TestBed.inject(Store);
    dataService = TestBed.inject(ProspectionsDataService)

  })

  it('should load prospections and emit the prospections from signals', () => {

    const prospections = dataService.getProspections();
    expect(prospections()).toEqual([])
    dataService.loadProspections();
    expect(prospections().length).toEqual(3)

  })

  it('should add a new prospection', () => {

    dataService.loadProspections();
    dataService.createProspection(cloneDeep(prospectionDtoMock4));
    const prospections = dataService.getProspections();
    expect(prospections().length).toEqual(4);

  })

  it('should update a prospection', () => {

    const prospections = dataService.getProspections();
    dataService.loadProspections();
    const newProspection = cloneDeep(prospectionDtoMock4);
    dataService.createProspection(newProspection);

    const update = { id: newProspection.id, price: 100000};
    dataService.updateProspection(update);
    expect(prospections()[3].price).toEqual(100000);

  })

  it('should delete a prospection', () => {

    const prospections = dataService.getProspections();
    dataService.loadProspections();
    expect(prospections().find(prospection => prospection.id === prospectionDtoMock3.id)).toBeTruthy();
    dataService.deleteProspection(prospectionDtoMock3.id!);
    expect(prospections().length).toEqual(2);

  })

})
