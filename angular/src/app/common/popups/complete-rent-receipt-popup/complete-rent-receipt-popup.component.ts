import { Component, computed, effect, Inject, input, Signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-complete-rent-receipt-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './complete-rent-receipt-popup.component.html',
  styleUrl: './complete-rent-receipt-popup.component.scss'
})
export class CompleteRentReceiptPopupComponent {

  fields: Signal<string[]>;
  formGroup!: UntypedFormGroup;

  constructor(@Inject(NZ_MODAL_DATA) public data: { fields: string[] }, private formBuilder: FormBuilder) {

    this.fields = computed(() => this.data.fields);

    effect(() => {

      console.log('fields', this.fields());

      if (this.fields()) {

        let controls: any = {};
        this.fields()!.forEach(field => {
          controls[field] = new FormControl('', Validators.required);
        });
        this.formGroup = this.formBuilder.group(controls);
      }

    });

  }

  complete() {
    console.log('complete', this.formGroup.value);
  }


}
