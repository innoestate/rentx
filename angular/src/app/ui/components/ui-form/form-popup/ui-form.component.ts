import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { UiFormFooterComponent } from './components/footer/ui-form-footer.component';
import { UiFormFieldData } from './models/ui-form.field-data.model';
import { UiFormFieldsData } from './models/ui-form.input-data.model';
import { UiFormObject } from './models/ui-form.model';
import { UiFormBodyComponent } from './components/body/ui-form-body.component';

@Component({
  templateUrl: './ui-form.component.html',
  imports: [
    CommonModule,
    UiFormBodyComponent,
    UiFormFooterComponent
  ],
  styleUrls: ['./ui-form.component.scss'],
  standalone: true
})
export class UiFormComponent<T extends Object> implements OnInit {

  formGroup!: FormGroup<{ [K in keyof UiFormObject]: AbstractControl<any, any> }>;
  fieldsData: UiFormFieldData[] = [];
  initialValues: any = {};

  constructor(@Inject(NZ_MODAL_DATA) public data: UiFormFieldsData<T>, protected nzModalRef: NzModalRef, protected formBuilder: FormBuilder) {
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

  private extractFieldsForFormGroup(keys: string[]): { [K in keyof UiFormObject]: AbstractControl<any> } {
    return keys.reduce((acc, key) => {
      const fieldData = this.fieldsData.find(fieldData => fieldData.key === key);
      acc[key] = new FormControl(this.initialValues[key] ?? '', fieldData?.required ? Validators.required : null);
      return acc;
    }, {} as { [K in keyof UiFormObject]: AbstractControl<any> });
  }

}
