import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EstatesService } from 'src/app/core/services/estates.service';
import { LodgersService } from 'src/app/core/services/lodgers.service';
import { OwnersService } from 'src/app/core/services/owners.http.service';
import { RentsHttpService } from 'src/app/core/services/rents.http.service';
import { EstatesDataService } from '../esates.data.service';
import { EstatesDataModule } from '../estates.data.module';
import { EstatesComponent } from './mock/estates.directive';
import { MockEstatesService } from './mock/estates.service.mocked';
import { MockLodgersService } from './mock/lodgers.service.mocked';
import { MockOwnersService } from './mock/owners.service.mocked';
import { MockRentsHttpService } from './mock/rents.http.service.mocked';

describe('EstatesDataService', () => {
  let dataService: EstatesDataService;
  let fixture: ComponentFixture<EstatesComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [EstatesComponent],
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EstatesDataModule,
        HttpClientModule
      ],
      providers: [
        { provide: EstatesService, useClass: MockEstatesService },
        { provide: OwnersService, useClass: MockOwnersService },
        { provide: LodgersService, useClass: MockLodgersService },
        { provide: RentsHttpService, useClass: MockRentsHttpService }
      ]
    }).createComponent(EstatesComponent);
    dataService = TestBed.inject(EstatesDataService);
    fixture.detectChanges();
    dataService.loadEstates();

  });

  it('should load the array of estates correctly', fakeAsync(() => {
    //WIP
    // tick(3000);
    // fixture.detectChanges();
    // const estates = fixture.componentInstance.estates();
    // expect(estates?.length).toBe(2);
  }));

});
