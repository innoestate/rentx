import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLabelComponent } from './ui-label.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('UiLabelComponent', () => {
  let component: UiLabelComponent;
  let fixture: ComponentFixture<UiLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLabelComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiLabelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', { label: 'test', value: 'test' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
