import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SellersHttpService } from "src/app/sellers/data/http/sellers.http.service";
import { SellersDataModule } from "src/app/sellers/data/module/sellers.data.module";
import { SellersDataService } from "src/app/sellers/data/service/sellers.data.service";
import { SellersHttpSuccessMockService } from "src/app/sellers/data/test/mock/sellers.http.success.mock.service";
import { UiModule } from "src/app/ui/ui.module";
import { ProspectionsTableAdapter } from "../../adapters/prospections.table.adapter";
import { ProspectionsHttpService } from "../../data/http/prospections.http.service";
import { ProspectionsDataModule } from "../../data/module/prospections.data.module";
import { ProspectionsDataService } from "../../data/service/prospections.data.service";
import { ProspectionDtoMock1 } from "../../test/mocks/prospections.dto.mock";
import { ProspectionHttpMockService } from "../../data/test/service/prospection.http.success.mock.service";
import { ProspectionTableDirectiveMock } from "./mock/prospection-table.mock.component";


describe('ProspectionTableDirective successful update testing', () => {

  let fixture: ComponentFixture<ProspectionTableDirectiveMock>;
  let component: ProspectionTableDirectiveMock;
  let prospectionDataService;
  let sellersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports:  [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        ProspectionTableDirectiveMock,
        ProspectionsDataModule,
        SellersDataModule,
        UiModule
      ],
      providers: [
        {
          provide: ProspectionsHttpService,
          useClass: ProspectionHttpMockService
        },
        {
          provide: SellersHttpService,
          useClass: SellersHttpSuccessMockService
        },
        provideExperimentalZonelessChangeDetection(),
        ProspectionsDataService,
        SellersDataService,
        ProspectionsTableAdapter,
      ]
    });

    fixture = TestBed.createComponent(ProspectionTableDirectiveMock);
    component = fixture.componentInstance;

    prospectionDataService = TestBed.inject(ProspectionsDataService);
    sellersDataService = TestBed.inject(SellersDataService);

    prospectionDataService.loadProspections();
    sellersDataService.load();
  })

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have a builded table', () => {
    expect(component.table().rows.length).toBe(3);
  })

  it('should update a row', () => {
    component.updateRow({ data: { id: ProspectionDtoMock1.id }, cells: { zip: '2345' } });
    const prospection = component.prospections().find(prospection => prospection.id === ProspectionDtoMock1.id);
    fixture.detectChanges();
    expect(prospection!.zip).toBe('2345');
  })

})
