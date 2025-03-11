import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { FormGroupFooterComponent } from './components/footer/form-popup-footer.component';
import { FormPopupFieldData } from './models/form-popup.fields-data.model';
import { FormPopupFieldsData } from './models/form-popup.input-data.model';
import { FormGroupObject } from './models/form-object.model';
import { FormPopupBodyComponent } from './components/body/form-popup-body.component';

@Component({
  templateUrl: './form-popup.component.html',
  imports: [
    CommonModule,
    FormPopupBodyComponent,
    FormGroupFooterComponent
  ],
  styleUrls: ['./form-popup.component.scss'],
  standalone: true
})
export class FormPopupComponent<T extends Object> implements OnInit {

  formGroup!: FormGroup<{ [K in keyof FormGroupObject]: AbstractControl<any, any> }>;
  fieldsData: FormPopupFieldData[] = [];
  initialValues: any = {};

  constructor(@Inject(NZ_MODAL_DATA) public data: FormPopupFieldsData<T>, protected nzModalRef: NzModalRef, protected formBuilder: FormBuilder) {
    this.fieldsData = data.fields;
    this.initialValues = data.value || {};
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup() {
    const keys = this.getKeysFromFieldsData();
    const object = this.extractFieldsForFormGroup(keys);
    this.formGroup = this.formBuilder.group(object);
  }

  validate() {
    if (this.formGroup.invalid)
      return;
    this.data.onValidate(this.formGroup.value as T, () => {
      this.nzModalRef.close(this.formGroup);
    });
  }

  private getKeysFromFieldsData(): string[] {
    return this.fieldsData.map(fieldData => fieldData.key);
  }

  private extractFieldsForFormGroup(keys: string[]): { [K in keyof FormGroupObject]: AbstractControl<any> } {
    return keys.reduce((acc, key) => {
      const fieldData = this.fieldsData.find(fieldData => fieldData.key === key);
      acc[key] = new FormControl(this.initialValues[key] ?? '', fieldData?.required ? Validators.required : null);
      return acc;
    }, {} as { [K in keyof FormGroupObject]: AbstractControl<any> });
  }

}
