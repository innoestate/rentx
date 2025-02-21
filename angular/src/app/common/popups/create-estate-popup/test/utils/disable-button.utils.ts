import { TestBed } from "@angular/core/testing";
import { CreateDesktopEstatePopupComponent } from "../../create-estate-popup.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Store, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ownersReducer } from "src/app/core/store/owner/owners.reducers";
import { OwnersEffects } from "src/app/core/store/owner/owners.effects";
import { OwnersService } from "src/app/core/services/owners.http.service";
import { MockOwnersService } from "src/app/core/services/owners.service.mocked";
import { loadLodgers } from "src/app/core/store/lodger/lodgers.actions";

export const configureModule = async () => {
  await TestBed.configureTestingModule({
    imports: [CreateDesktopEstatePopupComponent,
      BrowserAnimationsModule,
      StoreModule.forRoot([]),
      EffectsModule.forRoot([]),
      StoreModule.forFeature('owners', ownersReducer),
      EffectsModule.forFeature([OwnersEffects])
    ],
    providers: [
      { provide: OwnersService, useClass: MockOwnersService }
    ]
  }).compileComponents();
}

export const initStoreWithMockedOwners = () => {
  const store = TestBed.inject(Store);
  store.dispatch(loadLodgers());
}
