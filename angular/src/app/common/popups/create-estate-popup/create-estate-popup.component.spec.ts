import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateDesktopEstatePopupComponent } from './create-estate-popup.component';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EstatesEffects } from 'src/app/core/store/estate/estates.effects';
import { estatesReducer } from 'src/app/core/store/estate/estates.reducers';
import { OwnersEffects } from 'src/app/core/store/owner/owners.effects';
import { ownersReducer } from 'src/app/core/store/owner/owners.reducers';
import { OwnersService } from 'src/app/core/services/owners.http.service';
import { MockOwnersService } from 'src/app/core/services/owners.service.mocked';


describe('CreateEstatePopupComponent', () => {
  let component: CreateDesktopEstatePopupComponent;
  let fixture: ComponentFixture<CreateDesktopEstatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDesktopEstatePopupComponent,
        EffectsModule.forRoot([]),
        // StoreModule.forFeature('estates', estatesReducer),
        StoreModule.forFeature('owners', ownersReducer),
        // StoreModule.forFeature('lodgers', lodgersReducer),
        // StoreModule.forFeature('rents', rentsReducer),
        EffectsModule.forFeature([OwnersEffects])
      ],
      providers: [
        // { provide: EstatesService, useClass: MockEstatesService },
        // { provide: LodgersService, useClass: MockLodgersService },
        { provide: OwnersService, useClass: MockOwnersService }
      ]
    }).compileComponents();

    // modalServiceTest = TestBed.inject(NzModalService);
    // mockEstatesService = TestBed.inject(MockEstatesService);
    // messageService = TestBed.inject(NzMessageService);

    const store = TestBed.inject(Store);
    // store.dispatch(loadOwners());
    // store.dispatch(loadEstates());
    store.dispatch(loadLodgers());

    fixture = TestBed.createComponent(CreateDesktopEstatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
