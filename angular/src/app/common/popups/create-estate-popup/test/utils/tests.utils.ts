import { TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";
import { Store, StoreModule } from "@ngrx/store";
import { OwnersService } from "src/app/core/services/owners.http.service";
import { MockOwnersService } from "src/app/core/services/owners.service.mocked";
import { loadOwners as loadOwnersAction } from "src/app/core/store/owner/owners.actions";
import { OwnersEffects } from "src/app/core/store/owner/owners.effects";
import { ownersReducer } from "src/app/core/store/owner/owners.reducers";
import { CreateDesktopEstatePopupComponent } from "../../create-estate-popup.component";

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
  store.dispatch(loadOwnersAction());
}
