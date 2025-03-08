import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Lodger_Form } from 'src/app/core/models/forms/lodger-form.model';
import { Lodger_Post } from 'src/app/core/models/requests/lodger-post-request.model';
import { formatLodgerFormValueToEstatePostRequest } from 'src/app/core/utils/lodger.utils';
import { Estate } from 'src/app/estates/models/estate.model';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';

export interface CreateLodgerData { estate: Estate, onCreateLodger: (lodger: Lodger_Post, successCallback: () => void) => void }

@Component({
  selector: 'app-create-lodger-popup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiButtonComponent
  ],
  templateUrl: './create-lodger-popup.component.html',
  styleUrls: ['./create-lodger-popup.component.scss'],
  standalone: true
})
export class CreateLodgerPopupComponent implements OnInit {
  formGroup!: FormGroup<Lodger_Form>;
  showCloseButton = false;

  constructor(@Inject(NZ_MODAL_DATA) public data: CreateLodgerData, protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl(''),
    } as Lodger_Form);
  }

  create() {
    if (this.formGroup.invalid)
      return;
    const lodger = formatLodgerFormValueToEstatePostRequest(this.formGroup);
    this.data.onCreateLodger(lodger, () => {
      this.showCloseButton = true;
    });
  }

}
