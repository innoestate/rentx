import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesktopProspectionsNavigationComponent } from './desktop-prospections-navigation.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { UiNavigationComponent } from 'src/app/ui/components/ui-navigation/ui-navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UiIconService } from 'src/app/ui/components/ui-icon/service/ui-icon.service';
import { UiIconMockService } from 'src/app/ui/components/ui-icon/mocks/ui-icon.mock.service';
import { LocalizationsService } from 'src/app/core/localizations/localizations.service';

describe('DesktopProspectionsNavigationComponent', () => {
  let component: DesktopProspectionsNavigationComponent;
  let fixture: ComponentFixture<DesktopProspectionsNavigationComponent>;
  let localizationsMock: jasmine.SpyObj<LocalizationsService>;

  beforeEach(async () => {
    localizationsMock = jasmine.createSpyObj('LocalizationsService', ['getLocalization']);
    localizationsMock.getLocalization.and.returnValue('Test Label');

    await TestBed.configureTestingModule({
      declarations: [DesktopProspectionsNavigationComponent],
      imports: [UiNavigationComponent, RouterTestingModule],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: UiIconService,
          useClass: UiIconMockService
        },
        {
          provide: LocalizationsService,
          useValue: localizationsMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopProspectionsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize navigators with correct values', () => {
    expect(component.navigators()).toEqual([
      {
        label: 'Test Label',
        navigate: '/desktop/me/dashboard/prospections/main'
      },
      {
        label: 'Test Label',
        navigate: '/desktop/me/dashboard/prospections/sellers'
      }
    ]);
  });
});
