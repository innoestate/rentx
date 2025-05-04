import { CommonModule } from '@angular/common';
import { Component, input, model, OnDestroy, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { SignatureComponent } from 'src/app/displays/common/components/signature-pad/signature.component';
import { UiDropdownComponent } from '../ui-dropdown/ui-dropdown.component';
import { UiFormFieldData } from './models/ui-form.field-data.model';
import { UiFormObject } from './models/ui-form.model';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'ui-form',
  templateUrl: './ui-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiDropdownComponent,
    SignatureComponent,
    NzDatePickerModule
  ],
  styleUrls: ['./ui-form.component.scss'],
  standalone: true
})
export class UiFormComponent<T extends Object> implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  formGroup!: FormGroup<{ [K in keyof UiFormObject]: AbstractControl<any, any> }>;
  fields = input<UiFormFieldData[]>([]);
  initialValues = input<any>({});
  valid = output<boolean>();
  form = output<FormGroup<any>>();

  values = model<any>();

  constructor(protected formBuilder: FormBuilder) {
    // console.log('UiFormComponent3 constructor')
  }

  ngOnInit(): void {
    this.buildFormGroup();
    this.listenToFormStatus();
  }

  buildFormGroup() {
    const keys = this.getKeysFromFieldsData();
    const values = this.extractFieldsForFormGroup(keys);
    this.formGroup = this.formBuilder.group(values);
  }

  listenToFormStatus() {

    this.formGroup.valueChanges.pipe(
      tap( values => {
        this.values.set(values);
      }),
      takeUntil(this.destroyed$),
    ).subscribe();

    this.formGroup.statusChanges.pipe(
      tap( status => {
        if(status === 'VALID'){
          this.valid.emit(true);
        }else if ( status === 'INVALID'){
          this.valid.emit(false);
        }
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  ngOnDestroy(){
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private getKeysFromFieldsData(): string[] {
    return this.fields().map(fieldData => fieldData.key);
  }

  private extractFieldsForFormGroup(keys: string[]): { [K in keyof UiFormObject]: AbstractControl<any> } {
    return keys.reduce((acc, key) => {
      const fieldData = this.fields().find(fieldData => fieldData.key === key);
      if(this.values()){
        acc[key] = new FormControl(this.values()[key] ?? '', fieldData?.required ? Validators.required : null);
      }else{
        acc[key] = new FormControl('', fieldData?.required ? Validators.required : null);
      }
      return acc;
    }, {} as { [K in keyof UiFormObject]: AbstractControl<any> });
  }

}
