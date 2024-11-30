import { Directive, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { NZ_MODAL_DATA } from "ng-zorro-antd/modal";
import { Owner_Form } from "src/app/core/models/forms/owner-form.model";
import { Owner } from "src/app/core/models/owner.model";
import { updateOwner } from "src/app/core/store/owner/owners.actions";
import { formatOwnerForPatch } from "src/app/core/utils/owner.utils";

@Directive()
export class EditOwnerComponent implements OnInit {

  formGroup!: FormGroup<Owner_Form>;

  constructor(@Inject(NZ_MODAL_DATA) public data: { owner: Owner } ,protected formBuilder: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(this.data?.owner?.name??'', [Validators.required]),
      street: new FormControl(this.data?.owner?.street??''),//, [Validators.required]),
      city: new FormControl(this.data?.owner?.city??''),//, [Validators.required]),
      zip: new FormControl(this.data?.owner?.zip??''),//, [Validators.required]),
      signature: new FormControl(this.data?.owner?.signature??''),//),
    } as Owner_Form);
  }

  edit() {
    if (this.formGroup.invalid)
      return;
    const owner = formatOwnerForPatch(this.formGroup, this.data.owner.id); ;
    this.store.dispatch(updateOwner({ owner }))
  }

}
