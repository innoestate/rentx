import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Estate } from 'src/app/estates/models/estate.model';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';

@Component({
    selector: 'app-create-customized-rent-receipt-popup',
    imports: [
        ReactiveFormsModule,
        UiButtonComponent,
        NzDatePickerModule,
        CommonModule
    ],
    templateUrl: './create-customized-rent-receipt-popup.component.html',
    styleUrl: './create-customized-rent-receipt-popup.component.scss',
    standalone: true
})
export class CreateCustomizedRentReceiptPopupComponent {

  formGroup!: UntypedFormGroup;
  estate!: Estate;

  constructor(@Inject(NZ_MODAL_DATA) public data: { estate: Estate }, private modalRef: NzModalRef) {
    this.estate = data.estate;
  }

  ngOnInit() {
    const currentDate = new Date();
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    this.formGroup = new FormGroup({
      startDate: new FormControl(firstDayOfMonth, Validators.required),
      endDate: new FormControl(lastDayOfMonth),
    });
  }

  download() {
    this.modalRef.close({ type: 'download', startDate: this.formGroup.value.startDate, endDate: this.formGroup.value.endDate });
  }

  sendByEmail() {
    this.modalRef.close({ type: 'send', startDate: this.formGroup.value.startDate, endDate: this.formGroup.value.endDate });

  }

}
