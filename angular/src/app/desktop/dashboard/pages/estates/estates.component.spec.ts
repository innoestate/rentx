import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalRef, NzModalService, NzModalState } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EstatesService } from 'src/app/core/services/estates.service';
import { MockEstatesService } from 'src/app/core/services/estates.service.mocked';
import { RentsHttpService } from 'src/app/core/services/rents.http.service';
import { EstatesEffects } from 'src/app/core/store/estate/estates.effects';
import { estatesReducer } from 'src/app/core/store/estate/estates.reducers';
import { selectEstates } from 'src/app/core/store/estate/estates.selectors';
import { lodgersReducer } from 'src/app/core/store/lodger/lodgers.reducers';
import { ownersReducer } from 'src/app/core/store/owner/owners.reducers';
import { rentsReducer } from 'src/app/core/store/rents/rents.reducer';
import { EstateTableLodgerCellComponent } from './estate-table-lodger-cell/estate-table-lodger-cell.component';
import { EstateTableOwnerCellComponent } from './estate-table-owner-cell/estate-table-owner-cell.component';
import { EstatesPageDesktopComponent } from './estates.component';

describe('EstatesDesktopComponent', () => {
  let component: EstatesPageDesktopComponent;
  let fixture: ComponentFixture<EstatesPageDesktopComponent>;
  let modalService: NzModalService;
  let mockEstatesService: MockEstatesService;
  let messageService: NzMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EstatesPageDesktopComponent,
        EstateTableLodgerCellComponent,
        EstateTableOwnerCellComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        NzButtonModule,
        NzTableModule,
        NzModalModule,
        NzDropDownModule,
        NzMessageModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature('estates', estatesReducer),
        StoreModule.forFeature('owners', ownersReducer),
        StoreModule.forFeature('lodgers', lodgersReducer),
        StoreModule.forFeature('rents', rentsReducer),
        EffectsModule.forFeature([EstatesEffects])
      ],
      providers: [
        RentsHttpService,
        { provide: EstatesService, useClass: MockEstatesService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EstatesPageDesktopComponent);
    component = fixture.componentInstance;
    mockEstatesService = TestBed.inject(MockEstatesService);
    modalService = TestBed.inject(NzModalService);
    messageService = TestBed.inject(NzMessageService);

    const store = TestBed.inject(Store);
    store.dispatch({ type: '[Estates] Load Estates' });

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should dispatch loadEstates and update store state', (done) => {
    expect(component.estates().length).toEqual(2);
    setTimeout(() => {
      expect(component.estates()[0].id).toEqual('1');
      expect(component.estates()[1].id).toEqual('2');
      done();
    }, 100);
  });

  it('should create a modal, display correct content and close it', fakeAsync(() => {
    const modalRef: NzModalRef = component.openCreateEstatePopup();
    fixture.detectChanges();

    const modalElement = document.querySelector('.ant-modal');
    expect(modalElement).toBeTruthy();

    const modalTitle = modalElement?.querySelector('.ant-modal-title');
    expect(modalTitle?.textContent).toContain('Créer un nouveau bien');

    const modalContent = modalElement?.querySelector('.ant-modal-body');
    expect(modalContent).toBeTruthy();

    modalRef.close();
    fixture.detectChanges();
    tick(500);

    expect(modalRef.getState()).toBe(NzModalState.CLOSED);
    expect(document.querySelector('.ant-modal')).toBeNull();
  }));

  it('should add a new estate', fakeAsync(() => {
    const store = TestBed.inject(Store);
    let storeEstates: any[] = [];

    const subscription = store.select(selectEstates).subscribe(estates => {
      storeEstates = estates;
    });

    const initialCount = storeEstates.length;
    const modalRef: NzModalRef = component.openCreateEstatePopup();
    fixture.detectChanges();

    const modalComponent = modalRef.getContentComponent();
    modalComponent.formGroup.patchValue({
      street: '123 Test Street',
      city: 'Test City',
      zip: '12345',
      plot: 'Test Plot',
      owner: 'owner1',
      rent: 0,
      charges: 0
    });

    modalComponent.create();
    tick(1000);
    fixture.detectChanges();

    const newEstate = storeEstates.find(estate =>
      estate.street === '123 Test Street' &&
      estate.city === 'Test City' &&
      estate.zip === '12345' &&
      estate.owner_id === 'owner1'
    );

    expect(storeEstates).withContext('Estate count should increase by 1').toHaveSize(initialCount + 1);
    expect(newEstate).withContext('New estate should exist').toBeDefined();
    expect(newEstate?.street).withContext('Street should match').toEqual('123 Test Street');
    expect(newEstate?.city).withContext('City should match').toEqual('Test City');
    expect(newEstate?.zip).withContext('ZIP should match').toEqual('12345');
    expect(newEstate?.owner_id).withContext('Owner ID should match').toEqual('owner1');

    const componentEstates = component.estates();
    const componentEstate = componentEstates.find(estate =>
      estate.street === '123 Test Street' &&
      estate.city === 'Test City' &&
      estate.zip === '12345' &&
      estate.owner_id === 'owner1'
    );

    expect(componentEstates).withContext('Component estate count should increase by 1').toHaveSize(initialCount + 1);
    expect(componentEstate).withContext('New estate should exist in component').toBeDefined();
    expect(componentEstate?.street).withContext('Component estate street should match').toEqual('123 Test Street');
    expect(componentEstate?.city).withContext('Component estate city should match').toEqual('Test City');
    expect(componentEstate?.zip).withContext('Component estate ZIP should match').toEqual('12345');
    expect(componentEstate?.owner_id).withContext('Component estate owner ID should match').toEqual('owner1');

    fixture.detectChanges();
    tick(100);
    const messageElement = document.querySelector('.ant-message-notice-content');
    expect(messageElement?.textContent).withContext('Success message should be shown').toMatch('Bien ajouté avec succès!');
    tick(1000);

    subscription.unsubscribe();
    flush();
  }));
});
