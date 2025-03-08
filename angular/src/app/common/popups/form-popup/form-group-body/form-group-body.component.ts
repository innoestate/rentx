import { Component, input } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignatureComponent } from 'src/app/common/components/signature-pad/signature.component';
import { UiDropdownComponent } from 'src/app/ui/components/ui-dropdown/ui-dropdown.component';
import { CreatePopupFieldData, FormGroupObject } from '../../create-popup/create-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-group-body',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiDropdownComponent,
    SignatureComponent,
  ],
  templateUrl: './form-group-body.component.html',
  styleUrl: './form-group-body.component.scss'
})
export class FormGroupBodyComponent {

  formGroup = input.required<FormGroup<{ [K in keyof FormGroupObject]: AbstractControl<any, any> }>>();
  fieldsData = input.required<CreatePopupFieldData[]>();

}
