import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { createProspection } from 'src/app/core/store/prospections.actions';
import { Prospection_Dto } from 'src/app/core/models/dtos/prospection.dto.model';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-create-prospection',
  templateUrl: './create-prospection.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    NzButtonModule
  ],
  styleUrls: ['./create-prospection.component.css']
})
export class CreateProspectionComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private store: Store
  ) {
    this.form = this.fb.group({
      city: ['', Validators.required],
      address: [''],
      price: [null],
      // Add other fields as necessary
    });
  }

  create(): void {
    if (this.form.valid) {
      const prospection: Prospection_Dto = this.form.value;
      this.store.dispatch(createProspection({ prospection }));
      this.modal.close();
    } else {
      // Handle form validation errors
    }
  }

  close(): void {
    this.modal.close();
  }
}
