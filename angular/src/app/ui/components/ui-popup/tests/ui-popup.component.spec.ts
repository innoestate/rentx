import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiFormPopupComponent } from '../ui-popup.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { UiSpinnerComponent } from 'src/app/ui/components/ui-spinner/ui-spinner.component';
import { CommonModule } from '@angular/common';
import { UiFormComponent } from 'src/app/ui/components/ui-form/ui-form.component';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiDropdownComponent } from 'src/app/ui/components/ui-dropdown/ui-dropdown.component';
import { SignatureComponent } from 'src/app/displays/common/components/signature-pad/signature.component';
import { By } from '@angular/platform-browser';

describe('UiPopupComponent', () => {
  let component: UiFormPopupComponent;
  let fixture: ComponentFixture<UiFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiFormPopupComponent,
        ReactiveFormsModule,
        FormsModule,
        UiFormComponent,
        UiButtonComponent,
        CommonModule,
        UiSpinnerComponent,
        UiDropdownComponent,
        SignatureComponent,
      ],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UiFormPopupComponent);
    component = fixture.componentInstance;
    component.fields.set([{key: 'test', label: 'test', type: 'text'}]);
    component.values.set({test: 'test'});
    spyOn(component.onValidate, 'emit');
    fixture.detectChanges();
  });

  it('should create with default value', () => {
    expect(component).toBeTruthy();
    expect(component.values()).toEqual({test: 'test'});
  });

  it('should emit onValidate', () => {
    expect(component.onValidate.emit).not.toHaveBeenCalled();
    clickOnValidate();
    expect(component.onValidate.emit).toHaveBeenCalled();
  });

  it('should edit values', () => {
    typeOnInput('test', 'new test');
    clickOnValidate();
    expect(component.values()).toEqual({test: 'new test'});
  })

  const clickOnValidate = () => {
    const validationButton = fixture.debugElement.query(By.css('[test-selector="ui-popup-validation-button"]'));
    validationButton.nativeElement.click();
  }

  const typeOnInput = (field: string, value: string) => {
    const textInput = fixture.debugElement.query(By.css('[test-selector="ui-form-input-' + field + '"]'));
    (textInput.nativeElement as HTMLInputElement).value = value;
    textInput.nativeElement.dispatchEvent(new Event('input'));
  }

});
