import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SignatureComponent } from 'src/app/displays/common/components/signature-pad/signature.component';
import { UiDropdownComponent } from 'src/app/ui/components/ui-dropdown/ui-dropdown.component';
import { UiFormComponent } from '../ui-form.component';

describe('UiFormComponent test with null values', () => {
  let component: UiFormComponent<any>;
  let fixture: ComponentFixture<UiFormComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiFormComponent,
        CommonModule,
        ReactiveFormsModule,
        UiDropdownComponent,
        SignatureComponent,
      ],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UiFormComponent);
    fixture.componentRef.setInput('fields', [{key: 'test', label: 'test', type: 'text'}]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create html text input even with null values', () => {
    const inputTest = fixture.debugElement.query(By.css('[test-selector="ui-form-input-test"]'));
    expect(inputTest.nativeElement.value).toEqual('');
  });

});
