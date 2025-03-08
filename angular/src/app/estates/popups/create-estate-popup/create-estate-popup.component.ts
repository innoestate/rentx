import { Component, computed, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Owner } from 'src/app/core/models/owner.model';
import { Estate_Post_Request } from 'src/app/estates/models/estate-post-request.model';
import { Estate_Form } from 'src/app/estates/models/estate-form.model';
import { UiButtonComponent } from 'src/app/ui/components/ui-button/ui-button.component';
import { UiDropdownComponent } from 'src/app/ui/components/ui-dropdown/ui-dropdown.component';
import { formatEstateForPostRequest } from '../../models/estate.formater';

export interface CreateEstatePopupData {
  owners: Owner[],
  onCreateEstate: (estate: Estate_Post_Request, successCallback: () => void) => void
}

@Component({
  imports: [
    ReactiveFormsModule,
    UiButtonComponent,
    UiDropdownComponent
  ],
  selector: 'create-estate-popup',
  templateUrl: './create-estate-popup.component.html',
  styleUrl: './create-estate-popup.component.scss',
  standalone: true
})
export class CreateDesktopEstatePopupComponent implements OnInit {

  formGroup!: FormGroup<Estate_Form>;
  showCloseButton = false;

  constructor(@Inject(NZ_MODAL_DATA) public data: CreateEstatePopupData, protected modalRef: NzModalRef, protected formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup() {
    this.formGroup = this.formBuilder.group({
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      plot: new FormControl(''),
      rent: new FormControl(0),
      charges: new FormControl(0),
      owner_id: new FormControl(this.data.owners.length ? this.data.owners[0].id : null),
      lodger: new FormControl(''),
    } as Estate_Form);
  }

  create() {
    if (this.formGroup.invalid)
      return;
    const estate = formatEstateForPostRequest(this.formGroup);
    this.data.onCreateEstate(estate, () => {
      this.showCloseButton = true;
    });
  }

  ownersDropdown = computed(() => {
    return this.data.owners.map(owner => ({ label: owner.name, value: owner.id }));
  });

  close() {
    this.modalRef.close();
  }

}
