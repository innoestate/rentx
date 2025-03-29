import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSpinnerComponent } from './ui-spinner.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('UiSpinnerComponent', () => {
  let component: UiSpinnerComponent;
  let fixture: ComponentFixture<UiSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSpinnerComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
