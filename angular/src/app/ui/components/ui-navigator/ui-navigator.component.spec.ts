import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UiNavigatorComponent } from './ui-navigator.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { UiIconService } from '../ui-icon/service/ui-icon.service';
import { UiIconMockService } from '../ui-icon/mocks/ui-icon.mock.service';

describe('UiNavigatorComponent', () => {
  let component: UiNavigatorComponent;
  let fixture: ComponentFixture<UiNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiNavigatorComponent, RouterTestingModule],
      providers: [provideExperimentalZonelessChangeDetection(),
        {
          provide: UiIconService,
          useClass: UiIconMockService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiNavigatorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'test');
    fixture.componentRef.setInput('navigate', 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
