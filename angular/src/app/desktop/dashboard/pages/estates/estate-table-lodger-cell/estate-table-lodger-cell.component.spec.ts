import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MockEstatesService } from 'src/app/core/services/estates.service.mocked';
import { LodgersService } from 'src/app/core/services/lodgers.service';
import { EstatesEffects } from 'src/app/core/store/estate/estates.effects';
import { estatesReducer } from 'src/app/core/store/estate/estates.reducers';
import { LodgersEffects } from 'src/app/core/store/lodger/lodgers.effects';
import { lodgersReducer } from 'src/app/core/store/lodger/lodgers.reducers';
import { ownersReducer } from 'src/app/core/store/owner/owners.reducers';
import { rentsReducer } from 'src/app/core/store/rents/rents.reducer';
import { EstateTableLodgerCellComponent } from './estate-table-lodger-cell.component';
import { EstatesService } from 'src/app/core/services/estates.service';
import { selectEstates } from 'src/app/core/store/estate/estates.selectors';
import { MockLodgersService } from 'src/app/core/services/lodgers.service.mocked';
import { combineLatest } from 'rxjs';
import { selectLodgers } from 'src/app/core/store/lodger/lodgers.selectors';
import { loadLodgers } from 'src/app/core/store/lodger/lodgers.actions';

describe('EstateTableOwnerCellComponent', () => {

  let component: EstateTableLodgerCellComponent;
  let fixture: ComponentFixture<EstateTableLodgerCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EstateTableLodgerCellComponent,
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
        EffectsModule.forFeature([EstatesEffects, LodgersEffects])
      ],
      providers: [
        LodgersService,
        { provide: EstatesService, useClass: MockEstatesService },
        { provide: LodgersService, useClass: MockLodgersService }
      ]
    }).compileComponents();

    const store = TestBed.inject(Store);
    store.dispatch({ type: '[Estates] Load Estates' });

    fixture = TestBed.createComponent(EstateTableLodgerCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store.dispatch(loadLodgers());

  });

  it('check that mocked values are in store', (done) => {
    combineLatest([TestBed.inject(Store).select(selectEstates), TestBed.inject(Store).select(selectLodgers)]).subscribe(([estates, lodgers]) => {
      expect(estates.length).toBeGreaterThan(0);
      expect(lodgers.length).toBeGreaterThan(0);
      expect(estates[0].lodger?.name).toBe('John Doe');
      done();
    });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
