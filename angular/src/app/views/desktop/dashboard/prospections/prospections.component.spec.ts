import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopProspectionsComponent } from './prospections.component';
import { ProspectionsDataModule } from 'src/app/prospections/data/modules/prospections.data.module';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellersDataModule } from 'src/app/sellers/data/module/sellers.data.module';
import { ProspectionsHttpService } from 'src/app/prospections/data/http/prospections.http.service';
import { ProspectionHttpSuccessMockService } from 'src/app/prospections/data/services/tests/mocks/prospections.http.success.mock.service';
import { SellersHttpService } from 'src/app/sellers/data/http/sellers.http.service';
import { SellersHttpSuccessMockService } from 'src/app/sellers/data/test/mock/sellers.http.success.mock.service';
import { ProspectionsDataService } from 'src/app/prospections/data/services/prospections.data.service';
import { SellersDataService } from 'src/app/sellers/data/service/sellers.data.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DesktopProspectionsHandlerMenuComponent } from './menu/desktop-prospections-handler-menu.component';
import { DesktopProspectionsCommandsService } from './commands/desktop.prospections.commands.service';
import { UiModule } from 'src/app/ui/ui.module';
import { ProspectionsDesktopRoutingModule } from './prospections.routing';
import { By } from '@angular/platform-browser';

describe('DesktopProspectionsComponent', () => {
  let component: DesktopProspectionsComponent;
  let fixture: ComponentFixture<DesktopProspectionsComponent>;
  let prospectionsDataService: ProspectionsDataService;
  let sellersDataService: SellersDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesktopProspectionsComponent, DesktopProspectionsHandlerMenuComponent],
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        CommonModule,
        ProspectionsDesktopRoutingModule,
        ProspectionsDataModule,
        SellersDataModule,
        UiModule
      ],
      providers: [
        {
          provide: ProspectionsHttpService,
          useClass: ProspectionHttpSuccessMockService
        },
        {
          provide: SellersHttpService,
          useClass: SellersHttpSuccessMockService
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
      const sellers = sellersDataService.get();
      expect(prospections().length > 0).toEqual(true);
      expect(sellers().length > 0).toEqual(true);
  });

  it('should display the prospections handler menu', () => {
    const handlerMenuElement = fixture.debugElement.query(By.directive(DesktopProspectionsHandlerMenuComponent));
    expect(handlerMenuElement).toBeTruthy();
  });



});
