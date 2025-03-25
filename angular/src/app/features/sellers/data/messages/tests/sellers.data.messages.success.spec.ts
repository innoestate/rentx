import { provideExperimentalZonelessChangeDetection } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { EffectsModule } from "@ngrx/effects"
import { Store, StoreModule } from "@ngrx/store"
import { cloneDeep } from "lodash"
import { LocalizationsService } from "src/app/core/localizations/localizations.service"
import { sellerDtoMock1, sellerDtoMock3, sellerDtoMock4 } from "src/app/features/sellers/mocks/sellers.dto.mock"
import { DataNgrxService } from "src/app/shared/data/ngrx/data.ngrx.service"
import { MessageTestHelper } from "src/app/ui/services/message/test/message.test.helper"
import { SellersHttpService } from "../../http/sellers.http.service"
import { SellersDataModule } from "../../modules/sellers.data.module"
import { SellersDataService } from "../../services/sellers.data.service"
import { SellersDataMessagesModuleInitializer } from "./mocks/sellers.data.messages.module.initializer"
import { SellersHttpSuccessMockService } from "src/app/features/sellers/mocks/sellers.http.success.mock.service"

describe('SellersDataMessagesService test successful CRUD displaying messages ', () => {

  let dataService: SellersDataService;
  let store: Store;
  let messageTestHelper = new MessageTestHelper();
  let localizationService: LocalizationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        SellersDataModule,
        SellersDataMessagesModuleInitializer
      ],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        DataNgrxService,
        SellersDataService,
        {
          provide: SellersHttpService,
          useClass: SellersHttpSuccessMockService
        }
      ]
    })
    store = TestBed.inject(Store);
    dataService = TestBed.inject(SellersDataService);
    localizationService = TestBed.inject(LocalizationsService);
    dataService.loadSellers();

  })

  it('should add a new seller and show success message', () => {
    dataService.createSeller(cloneDeep(sellerDtoMock4));
    messageTestHelper.hasDisplaySuccessMessage(localizationService.getLocalization('sellers','addSellerSuccess'));
  })

  it('should update a seller and show success message', () => {
    dataService.updateSeller({...cloneDeep(sellerDtoMock1), city: 'Las Vegas'});
    messageTestHelper.hasDisplaySuccessMessage(localizationService.getLocalization('sellers','updateSellerSuccess'));
  })

  it('should delete a seller and show success message', () => {
    dataService.deleteSeller(sellerDtoMock3.id!);
    messageTestHelper.hasDisplaySuccessMessage(localizationService.getLocalization('sellers','deleteSellerSuccess'));
  })

});