import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProspectionStoreFacade } from 'src/app/core/facade/prospection.store.facade';
import { SellerDTO } from 'src/app/core/models/dtos/seller.dto.model';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';

@Component({
    selector: 'app-create-seller-popup',
    templateUrl: './create-seller-popup.component.html',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NzSelectModule,
        UiButtonComponent
    ],
    styleUrls: ['./create-seller-popup.component.css'],
    standalone: true
})
export class CreateSellerPopupComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private prospectionFacade: ProspectionStoreFacade,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      address: [''],
      zip: [''],
      city: [''],
      agency: [''],
    });
  }

  create(): void {
    if (this.form.valid) {
      const seller: SellerDTO = this.form.value;
      this.prospectionFacade.createSeller(seller);
      this.modal.close();
    } else {
      // Handle form validation errors
    }
  }

  close(): void {
    this.modal.close();
  }
}
