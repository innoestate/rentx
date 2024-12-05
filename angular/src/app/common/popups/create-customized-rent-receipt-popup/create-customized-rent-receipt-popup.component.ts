import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Estate } from 'src/app/core/models/estate.model';
import { senddRentReceipt } from 'src/app/core/store/estate/estates.actions';
import { downloadRentReceipt } from 'src/app/core/store/rents/rents.actions';

@Component({
  selector: 'app-create-customized-rent-receipt-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCalendarModule
  ],
  templateUrl: './create-customized-rent-receipt-popup.component.html',
  styleUrl: './create-customized-rent-receipt-popup.component.scss'
})
export class CreateCustomizedRentReceiptPopupComponent {

  formGroup!: UntypedFormGroup;
  estate!: Estate;

  constructor(@Inject(NZ_MODAL_DATA) public data: { estate: Estate }, private modalRef: NzModalRef, private store: Store) {
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

  protected getNeededFieldsForDownloadRentReceipt() {
    const fields = [];
    if (!this.estate.owner?.street || this.estate.owner?.street === '') {
      fields.push('street');
    }
    if (!this.estate.owner?.city || this.estate.owner?.city === '') {
      fields.push('city');
    }
    if (!this.estate.owner?.zip || this.estate.owner?.zip === '') {
      fields.push('zip');
    }
    if (!this.estate.rent || this.estate.rent === 0) {
      fields.push('rent');
    }
    if (!this.estate.charges || this.estate.charges === 0) {
      fields.push('charges');
    }
    if (!this.estate.owner?.signature || this.estate.owner?.signature === '') {
      fields.push('signature');
    }
    return fields;
  }

  protected getNeededFieldsForSendRentReceiptByEmail() {
    const fields = this.getNeededFieldsForDownloadRentReceipt();
    if (this.estate.lodger?.email === '' || !this.estate.lodger?.email) {
      fields.push('lodgerEmail');
    }
    return fields;
  }


  download() {
    const downloadCommand = () => {
      this.store.dispatch(downloadRentReceipt({ estateId: this.data.estate.id, startDate: this.formGroup.value.startDate, endDate: this.formGroup.value.endDate }));
    }
    this.modalRef.close({ command: downloadCommand, type: 'download' });
  }

  sendByEmail() {
    const sendByEmail = () => {
      this.store.dispatch(senddRentReceipt({ estate: this.data.estate, startDate: this.formGroup.value.startDate, endDate: this.formGroup.value.endDate }));
    };
    this.modalRef.close({ command: sendByEmail, type: 'send' });
  }

}
