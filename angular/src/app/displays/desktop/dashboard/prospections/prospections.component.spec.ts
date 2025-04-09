import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProspectionsHttpService } from 'src/app/features/prospections/data/http/prospections.http.service';
import { ProspectionsDataModule } from 'src/app/features/prospections/data/modules/prospections.data.module';
import { ProspectionsDataService } from 'src/app/features/prospections/data/services/prospections.data.service';
import { ProspectionsHttpSuccessMockService } from 'src/app/features/prospections/mocks/prospections.http.success.mock.service';
import { SellersHttpService } from 'src/app/features/sellers/data/http/sellers.http.service';
import { SellersDataModule } from 'src/app/features/sellers/data/modules/sellers.data.module';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';
import { SellersHttpSuccessMockService } from 'src/app/features/sellers/mocks/sellers.http.success.mock.service';
import { UiIconMockService } from 'src/app/ui/components/ui-icon/mocks/ui-icon.mock.service';
import { UiIconService } from 'src/app/ui/components/ui-icon/service/ui-icon.service';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopProspectionsActionsComponent } from './actions/desktop-prospections-actions.component';
import { DesktopProspectionsCommandsService } from './commands/desktop.prospections.commands.service';
import { DesktopProspectionsNavigationComponent } from './navigation/desktop-prospections-navigation.component';
import { DesktopProspectionsComponent } from './prospections.component';
import { ProspectionsDesktopRoutingModule } from './prospections.routing';

describe('DesktopProspectionsComponent', () => {
  let component: DesktopProspectionsComponent;
  let fixture: ComponentFixture<DesktopProspectionsComponent>;
  let prospectionsDataService: ProspectionsDataService;
  let sellersDataService: SellersDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesktopProspectionsComponent,
        DesktopProspectionsActionsComponent,
        DesktopProspectionsNavigationComponent],
      imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        RouterTestingModule,
        CommonModule,
        ProspectionsDesktopRoutingModule,
        ProspectionsDataModule,
        SellersDataModule,
        UiModule
      ],
      providers: [
        {
          provide: ProspectionsHttpService,
          useClass: ProspectionsHttpSuccessMockService
        },
        {
          provide: SellersHttpService,
          useClass: SellersHttpSuccessMockService
        },
        {
          provide: UiIconService,
          useClass: UiIconMockService
        },
        provideExperimentalZonelessChangeDetection(),
        ProspectionsDataService,
        SellersDataService,
        DesktopProspectionsCommandsService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopProspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    prospectionsDataService = TestBed.inject(ProspectionsDataService);
    sellersDataService = TestBed.inject(SellersDataService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loaded prospections and sellers', () => {
    const prospections = prospectionsDataService.getProspections();
    const sellers = sellersDataService.getSellers();
    expect(prospections().length > 0).toEqual(true);
    expect(sellers().length > 0).toEqual(true);
  });

});
