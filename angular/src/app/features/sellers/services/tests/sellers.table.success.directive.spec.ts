import { provideExperimentalZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SellersHttpService } from "../../data/http/sellers.http.service";
import { SellersDataModule } from "../../data/modules/sellers.data.module";
import { SellersDataService } from "../../data/services/sellers.data.service";
import { UiModule } from "../../../../ui/ui.module";
import { SellersHttpSuccessMockService } from "../../mocks/sellers.http.success.mock.service";
import { SellersTableComponentMock } from "./mocks/sellers.table.mock.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { sellerDtoMock1 } from "../../mocks/sellers.dto.mock";


describe('SellersTableDirective successful update testing', () => {

  let fixture: ComponentFixture<SellersTableComponentMock>;
  let component: SellersTableComponentMock;
  let sellersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SellersDataModule,
        SellersTableComponentMock,
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

  it('should have a built table', () => {
    expect(component.table().rows.length).toBe(3);
  });

  it('should update a row', () => {
    component.updateRow({ data: { id: sellerDtoMock1.id }, cells: { zip: '2345' } });
    const seller = component.sellers().find(seller => seller.id === sellerDtoMock1.id);
    fixture.detectChanges();
    expect(seller!.zip).toBe('2345');
  });

  it('should throw an error with a null id', () => {
    expect(() => {
      component.updateRow({ data: {} as any, cells: { zip: '2345' } });
    }).toThrowError('Need an id in row data.');
  })

});
