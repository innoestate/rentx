import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopProspectionsActionsComponent } from './desktop-prospections-actions.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UiModule } from 'src/app/ui/ui.module';
import { UiIconService } from 'src/app/ui/components/ui-icon/service/ui-icon.service';
import { UiIconMockService } from 'src/app/ui/components/ui-icon/mocks/ui-icon.mock.service';

describe('DesktopProspectionsActionsComponent', () => {
  let component: DesktopProspectionsActionsComponent;
  let fixture: ComponentFixture<DesktopProspectionsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesktopProspectionsActionsComponent],
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        UiModule,
      ],
      providers: [provideExperimentalZonelessChangeDetection(),
        {
          provide: UiIconService,
          useClass: UiIconMockService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopProspectionsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
