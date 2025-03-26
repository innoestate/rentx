import { CommonModule } from '@angular/common';
import { Component, model, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UiFormBodyComponent } from './form-popup/components/body/ui-form-body.component';
import { UiFormFooterComponent } from './form-popup/components/footer/ui-form-footer.component';
import { UiFormFieldData } from './form-popup/models/ui-form.field-data.model';
import { UiFormObject } from './form-popup/models/ui-form.model';

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
export class UiFormComponent2<T extends Object> implements OnInit {

  formGroup!: FormGroup<{ [K in keyof UiFormObject]: AbstractControl<any, any> }>;
  fields = model<UiFormFieldData[]>([]);
  initialValues: any = {};
  onSubmit = output<{ [K in keyof UiFormObject]: AbstractControl<any, any> }>();

  constructor(protected formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup() {
    const keys = this.getKeysFromFieldsData();
    const object = this.extractFieldsForFormGroup(keys);
    this.formGroup = this.formBuilder.group(object);
  }

  submit() {
    if (this.formGroup.invalid)
      return;
    this.onSubmit.emit(this.formGroup.value);
  }

  private getKeysFromFieldsData(): string[] {
    return this.fields().map(fieldData => fieldData.key);
  }

  private extractFieldsForFormGroup(keys: string[]): { [K in keyof UiFormObject]: AbstractControl<any> } {
    return keys.reduce((acc, key) => {
      const fieldData = this.fields().find(fieldData => fieldData.key === key);
      acc[key] = new FormControl(this.initialValues[key] ?? '', fieldData?.required ? Validators.required : null);
      return acc;
    }, {} as { [K in keyof UiFormObject]: AbstractControl<any> });
  }

}
