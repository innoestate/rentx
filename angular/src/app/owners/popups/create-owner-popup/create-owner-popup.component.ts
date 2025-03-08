import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Owner_Form } from 'src/app/core/models/forms/owner-form.model';
import { Owner_Post_Request } from 'src/app/core/models/requests/owner-post-request.model';
import { formatOwnerFormValueToEstatePostRequest } from 'src/app/core/utils/owner.utils';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';
import { SignatureComponent } from '../../../common/components/signature-pad/signature.component';

export interface CreateOwnerPopupData {
  onCreateOwner: (owner: Owner_Post_Request, successCallback: () => void) => void
}

@Component({
  selector: 'app-create-owner-popup',
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    UiButtonComponent,
    SignatureComponent
  ],
  templateUrl: './create-owner-popup.component.html',
  styleUrls: ['./create-owner-popup.component.scss'],
  standalone: true
})
export class CreateOwnerPopupComponent {
  formGroup!: FormGroup<Owner_Form>;
  showCloseButton = false;

  constructor(@Inject(NZ_MODAL_DATA) public data: CreateOwnerPopupData, private nzModalRef: NzModalRef, protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      signature: new FormControl(''),
    } as Owner_Form);
  }

  create() {
    if (this.formGroup.invalid)
      return;
    const owner = formatOwnerFormValueToEstatePostRequest(this.formGroup);
    this.data.onCreateOwner(owner, () => {
      this.showCloseButton = true;
    });
  }

  close() {
    this.nzModalRef.close();
  }
}
