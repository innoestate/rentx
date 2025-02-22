import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { createProspection } from 'src/app/core/store/prospections/prospections.actions';
import { Prospection_Dto } from 'src/app/core/models/dtos/prospection.dto.model';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { UxButtonComponent } from 'src/app/ux/components/ux-button/ux-button.component';

@Component({
    selector: 'app-create-prospection',
    templateUrl: './create-prospection.component.html',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NzSelectModule,
        UxButtonComponent
    ],
    styleUrls: ['./create-prospection.component.css'],
    standalone: true
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
      zip: [''],
      address: [''],
      link: [''],
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
