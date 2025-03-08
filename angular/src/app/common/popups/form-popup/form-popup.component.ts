import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { CreatePopupData, CreatePopupFieldData, FormGroupObject } from '../create-popup/create-popup.component';
import { FormGroupBodyComponent } from './form-group-body/form-group-body.component';
import { FormGroupFooterComponent } from './form-group-footer/form-group-footer.component';

@Component({
  templateUrl: './form-popup.component.html',
  imports: [
    CommonModule,
    FormGroupBodyComponent,
    FormGroupFooterComponent
  ],
  styleUrls: ['./form-popup.component.scss'],
  standalone: true
})
export class FormPopupComponent<T extends Object> implements OnInit {

  formGroup!: FormGroup<{ [K in keyof FormGroupObject]: AbstractControl<any, any> }>;
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
    const keys = this.getKeysFromFieldsData();
    const object = this.extractFieldsForFormGroup(keys);
    this.formGroup = this.formBuilder.group(object);
  }

  validate() {
    if (this.formGroup.invalid)
      return;
    this.data.onCreate(this.formGroup.value as T, () => {
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
