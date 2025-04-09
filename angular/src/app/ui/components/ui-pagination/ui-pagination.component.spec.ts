import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPaginationComponent } from './ui-pagination.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { UiIconService } from '../ui-icon/service/ui-icon.service';
import { UiIconMockService } from '../ui-icon/mocks/ui-icon.mock.service';

describe('UiPaginationComponent', () => {
  let component: UiPaginationComponent;
  let fixture: ComponentFixture<UiPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPaginationComponent],
      providers: [provideExperimentalZonelessChangeDetection(),
        {
          provide: UiIconService,
          useClass: UiIconMockService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiPaginationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('total', 10);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
