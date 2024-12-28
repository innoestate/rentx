import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { SellerDTO } from 'src/app/core/models/dtos/seller.dto.model';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { createSeller } from 'src/app/core/store/sellers/sellers.actions';

@Component({
  selector: 'app-create-seller-popup',
  templateUrl: './create-seller-popup.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule
  ],
  styleUrls: ['./create-seller-popup.component.css']
})
export class CreateSellerPopupComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private store: Store
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      agency: [''],
    });
  }

  create(): void {
    if (this.form.valid) {
      const seller: SellerDTO = this.form.value;
      this.store.dispatch(createSeller({ seller }));
      this.modal.close();
    } else {
      // Handle form validation errors
    }
  }

  close(): void {
    this.modal.close();
  }
}
