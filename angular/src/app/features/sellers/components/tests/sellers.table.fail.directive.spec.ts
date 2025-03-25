import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SellersHttpService } from "../../data/http/sellers.http.service";
import { SellersDataModule } from "../../data/modules/sellers.data.module";
import { SellersDataService } from "../../data/services/sellers.data.service";
import { UiModule } from "../../../../ui/ui.module";
import { SellersTableComponentMock } from "./mocks/sellers.table.mock.component";
import { SellersHttpSuccessMockService } from "../../mocks/sellers.http.success.mock.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { sellerDtoMock1 } from "../../mocks/sellers.dto.mock";


describe('SellersTableDirective test with fail update', () => {

  let fixture: ComponentFixture<SellersTableComponentMock>;
  let component: SellersTableComponentMock;
  let sellersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports:  [
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SellersTableComponentMock,
        SellersDataModule,
        UiModule
      ],
      providers: [
        {
          provide: SellersHttpService,
          useClass: SellersHttpSuccessMockService
        },
        provideExperimentalZonelessChangeDetection(),
        SellersDataService,
      ]
    });

    fixture = TestBed.createComponent(SellersTableComponentMock);
    component = fixture.componentInstance;

    sellersDataService = TestBed.inject(SellersDataService);

    sellersDataService.loadSellers();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should handle update failure gracefully', () => {
    component.updateRow({ data: { id: sellerDtoMock1.id }, cells: { zip: '2345' } });
    const seller = component.sellers().find(seller => seller.id === sellerDtoMock1.id);
    fixture.detectChanges();
    expect(seller!.zip).not.toBe(sellerDtoMock1.zip);
  });

});
