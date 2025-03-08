import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';
import { UiDropdownItem } from 'src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model';
import { UiDropdownComponent } from 'src/app/ui/components/ui-dropdown/ui-dropdown.component';
import { SignatureComponent } from '../../components/signature-pad/signature.component';

export interface CreatePopupFieldData {
  key: string;
  label: string;
  type: 'text' | 'number' | 'dropdown' | 'signature';
  required: boolean,
  dropdownItems?: UiDropdownItem<any>[]
}

export interface FormGroupObject {
  [key: string]: AbstractControl<any, any>;
}

export interface CreatePopupData<T> {
  value?: T,
  fields: CreatePopupFieldData[],
  onCreate: (createdObject: T, performedActionSuccessfullCallback?: () => void ) => void
}

@Component({
  selector: 'app-create-lodger-popup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiButtonComponent,
    UiDropdownComponent,
    SignatureComponent
  ],
  templateUrl: './create-popup.component.html',
  styleUrls: ['./create-popup.component.scss'],
  standalone: true
})
export class CreatePopupComponent<T extends Object> implements OnInit {

  formGroup!: FormGroup<{ [K in keyof FormGroupObject]: AbstractControl<any, any> }>;
  showCloseButton = false;
  fieldsData: CreatePopupFieldData[] = [];
  initialValues: any = {};

  constructor(@Inject(NZ_MODAL_DATA) public data: CreatePopupData<T>, private nzModalRef: NzModalRef, protected formBuilder: FormBuilder) {
    this.fieldsData = data.fields;
    this.initialValues = data.value || {};
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup() {
    const keys: string[] = this.fieldsData.map(fieldData => fieldData.key);
    const object = keys.reduce((acc, key) => {
      const fieldData = this.fieldsData.find(fieldData => fieldData.key === key);
      acc[key] = new FormControl(this.initialValues[key]??'', fieldData?.required ? Validators.required : null);
      return acc;
    }, {} as { [K in keyof FormGroupObject]: AbstractControl<any> });

    this.formGroup = this.formBuilder.group(object);
  }

  create() {
    if (this.formGroup.invalid)
      return;
    this.data.onCreate(this.formGroup.value as T, () => {
      this.showCloseButton = true;
    });
  }

  close(){
    this.nzModalRef.close();
  }

}
