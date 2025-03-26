import { Component, input } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UiDropdownComponent } from 'src/app/ui/components/ui-dropdown/ui-dropdown.component';
import { CommonModule } from '@angular/common';
import { UiFormFieldData } from '../../models/ui-form.field-data.model';
import { UiFormObject } from '../../models/ui-form.model';
import { SignatureComponent } from 'src/app/displays/common/components/signature-pad/signature.component';

@Component({
  selector: 'form-popup-body',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiDropdownComponent,
    SignatureComponent,
  ],
  templateUrl: './ui-form-body.component.html',
  styleUrl: './ui-form-body.component.scss'
})
export class UiFormBodyComponent {

  formGroup = input.required<FormGroup<{ [K in keyof UiFormObject]: AbstractControl<any, any> }>>();
  fieldsData = input.required<UiFormFieldData[]>();

}
