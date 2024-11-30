import { Component, computed, effect, EventEmitter, Inject, input, Signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Lodger } from 'src/app/core/models/lodger.model';
import { Owner } from 'src/app/core/models/owner.model';
import { SignatureComponent } from '../../components/signature-pad/signature.component';

@Component({
  selector: 'app-complete-rent-receipt-popup',
  standalone: true,
  imports: [ReactiveFormsModule, SignatureComponent],
  templateUrl: './complete-rent-receipt-popup.component.html',
  styleUrl: './complete-rent-receipt-popup.component.scss'
})
export class CompleteRentReceiptPopupComponent {

  fields: Signal<string[]>;
  formGroup!: UntypedFormGroup;

  constructor(@Inject(NZ_MODAL_DATA) public data: { fields: string[] }, private formBuilder: FormBuilder, private modalRef: NzModalRef) {

    this.fields = computed(() => this.data.fields);

    effect(() => {
      if (this.fields() && this.fields()?.length > 0) {
        let controls: any = {};
        this.fields()!.forEach(field => {
          controls[field] = new FormControl('', Validators.required);
        });
        this.formGroup = this.formBuilder.group(controls);
      }else{
        this.modalRef.close();
      }
    });

  }

  complete() {
    if (this.formGroup.valid) {

      let owner: Partial<Owner> = {};
      if(this.formGroup.get('street')) {
        owner.street = this.formGroup.get('street')!.value;
      }
      if(this.formGroup.get('city')) {
        owner.city = this.formGroup.get('city')!.value;
      }
      if(this.formGroup.get('zip')) {
        owner.zip = this.formGroup.get('zip')!.value;
      }
      if(this.formGroup.get('signature')) {
        owner.signature = this.formGroup.get('signature')!.value;
      }
      if(this.formGroup.get('ownerEmail')) {
        owner.email = this.formGroup.get('ownerEmail')!.value;
      }

      let lodger: Partial<Lodger> = {};
      if(this.formGroup.get('lodgerEmail')) {
        lodger.email = this.formGroup.get('lodgerEmail')!.value;
      }
      this.modalRef.close({ owner, lodger });
    }
  }


}
