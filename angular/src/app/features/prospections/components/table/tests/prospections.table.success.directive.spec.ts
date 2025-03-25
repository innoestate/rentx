import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SellersHttpService } from "src/app/features/sellers/data/http/sellers.http.service";
import { SellersDataModule } from "src/app/features/sellers/data/modules/sellers.data.module";
import { SellersDataService } from "src/app/features/sellers/data/services/sellers.data.service";
import { SellersHttpSuccessMockService } from "src/app/features/sellers/data/test/mock/sellers.http.success.mock.service";
import { UiModule } from "src/app/ui/ui.module";
import { ProspectionsTableAdapterService } from "../../../adapters/table/prospections.table.adapter.service";
import { ProspectionsHttpService } from "../../../data/http/prospections.http.service";
import { ProspectionsDataModule } from "../../../data/modules/prospections.data.module";
import { ProspectionsDataService } from "../../../data/services/prospections.data.service";
import { prospectionDtoMock1 } from "../../../mocks/prospections.dto.mock";
import { ProspectionsHttpSuccessMockService } from "../../../mocks/prospections.http.success.mock.service";
import { ProspectionsTableDirectiveMock } from "./mocks/prospections.table.mock.component";


describe('ProspectionsTableDirective successful update testing', () => {

  let fixture: ComponentFixture<ProspectionsTableDirectiveMock>;
  let component: ProspectionsTableDirectiveMock;
  let prospectionDataService;
  let sellersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports:  [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        ProspectionsTableDirectiveMock,
        ProspectionsDataModule,
        SellersDataModule,
        UiModule
      ],
      providers: [
        {
          provide: ProspectionsHttpService,
          useClass: ProspectionsHttpSuccessMockService
        },
        {
          provide: SellersHttpService,
          useClass: SellersHttpSuccessMockService
        },
        provideExperimentalZonelessChangeDetection(),
        ProspectionsDataService,
        SellersDataService,
        ProspectionsTableAdapterService,
      ]
    });

    fixture = TestBed.createComponent(ProspectionsTableDirectiveMock);
    component = fixture.componentInstance;

    prospectionDataService = TestBed.inject(ProspectionsDataService);
    sellersDataService = TestBed.inject(SellersDataService);

    prospectionDataService.loadProspections();
    sellersDataService.loadSellers();
  })

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have a builded table', () => {
    expect(component.table().rows.length).toBe(3);
  })

  it('should update a row', () => {
    component.updateRow({ data: { id: prospectionDtoMock1.id! }, cells: { zip: '2345' } });
    const prospection = component.prospections().find(prospection => prospection.id === prospectionDtoMock1.id);
    fixture.detectChanges();
    expect(prospection!.zip).toBe('2345');
  })

})
