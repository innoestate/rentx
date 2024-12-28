import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProspectionsHttpService } from 'src/app/core/services/prospections.http.service';
import { ProspectionsHttpMockedService } from 'src/app/core/services/prospections.http.service.mocked';
import { RentsHttpService } from 'src/app/core/services/rents.http.service';
import { ProspectionsEffects } from 'src/app/core/store/prospections.effects';
import { prospectionReducer } from 'src/app/core/store/prospections.reducer';
import { ProspectionsDesktopComponent } from './prospections.component';

describe('ProspectionsDesktopComponent', () => {

  let fixture: ComponentFixture<ProspectionsDesktopComponent>;
  let mockedProspectionsHttpService: ProspectionsHttpMockedService;
  let messageService: NzMessageService;
  let prospectionsPageComponent: ProspectionsDesktopComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProspectionsDesktopComponent
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
        StoreModule.forFeature('prospections', prospectionReducer),
        EffectsModule.forFeature([ProspectionsEffects])
      ],
      providers: [
        RentsHttpService,
        { provide: ProspectionsHttpService, useClass: ProspectionsHttpMockedService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProspectionsDesktopComponent);
    prospectionsPageComponent = fixture.componentInstance;
    mockedProspectionsHttpService = TestBed.inject(ProspectionsHttpMockedService);
    messageService = TestBed.inject(NzMessageService);
    await fixture.whenStable();

  });

  it('should dispatch loadProspections and update store state', async() => {
    expect(prospectionsPageComponent.prospections().length).toEqual(1);
  });

});
