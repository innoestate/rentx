import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPopupContinuableComponent2 } from './ui-popup-continuable.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { SignatureComponent } from 'src/app/displays/common/components/signature-pad/signature.component';
import { UiDropdownComponent } from '../../ui-dropdown/ui-dropdown.component';
import { UiSpinnerComponent } from '../../ui-spinner/ui-spinner.component';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from '../../ui-button/ui-button.component';
import { UiFormComponent2 } from '../../ui-form/ui-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UiPopupContinuableComponent', () => {
  let component: UiPopupContinuableComponent2;
  let fixture: ComponentFixture<UiPopupContinuableComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPopupContinuableComponent2,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        UiFormComponent2,
        UiButtonComponent,
        CommonModule,
        UiSpinnerComponent,
        UiDropdownComponent,
        SignatureComponent,
      ],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiPopupContinuableComponent2);
    component = fixture.componentInstance;
    component.fields.set([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
