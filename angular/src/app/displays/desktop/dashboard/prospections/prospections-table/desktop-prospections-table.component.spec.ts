import { CommonModule } from '@angular/common';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProspectionsHttpService } from 'src/app/features/prospections/data/http/prospections.http.service';
import { ProspectionsDataModule } from 'src/app/features/prospections/data/modules/prospections.data.module';
import { ProspectionsDataService } from 'src/app/features/prospections/data/services/prospections.data.service';
import { ProspectionsHttpSuccessMockService } from 'src/app/features/prospections/mocks/prospections.http.success.mock.service';
import { SellersHttpService } from 'src/app/features/sellers/data/http/sellers.http.service';
import { SellersDataModule } from 'src/app/features/sellers/data/modules/sellers.data.module';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';
import { SellersHttpSuccessMockService } from 'src/app/features/sellers/data/test/mock/sellers.http.success.mock.service';
import { UiTableHelper } from 'src/app/ui/components/ui-table/test/helper/ui-table.helper';
import { UiModule } from 'src/app/ui/ui.module';
import { DesktopProspectionsCommandsService } from '../commands/desktop.prospections.commands.service';
import { DesktopProspectionsTableComponent } from './desktop-prospections-table.component';

describe('DesktopProspectionsTableComponent', () => {
  let component: DesktopProspectionsTableComponent;
  let fixture: ComponentFixture<DesktopProspectionsTableComponent>;
  let uiTableHelper: UiTableHelper;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        CommonModule,
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
        provideExperimentalZonelessChangeDetection(),
        ProspectionsDataService,
        SellersDataService,
        DesktopProspectionsCommandsService,
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(DesktopProspectionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    uiTableHelper = new UiTableHelper(fixture as any);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
