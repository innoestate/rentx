import { Component, input } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UiDropdownComponent } from 'src/app/ui/components/ui-dropdown/ui-dropdown.component';
import { CommonModule } from '@angular/common';
import { FormPopupFieldData } from '../../models/form-popup.fields-data.model';
import { FormGroupObject } from '../../models/form-object.model';
import { SignatureComponent } from 'src/app/views/common/components/signature-pad/signature.component';

@Component({
  selector: 'form-popup-body',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiDropdownComponent,
    SignatureComponent,
  ],
  templateUrl: './form-popup-body.component.html',
  styleUrl: './form-popup-body.component.scss'
})
export class FormPopupBodyComponent {

  formGroup = input.required<FormGroup<{ [K in keyof FormGroupObject]: AbstractControl<any, any> }>>();
  fieldsData = input.required<FormPopupFieldData[]>();

}
