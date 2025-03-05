import { Directive, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Owner_Form } from "src/app/core/models/forms/owner-form.model";
import { formatOwnerFormValueToEstatePostRequest } from "src/app/core/utils/owner.utils";
import { addOwner } from "src/app/owners/data/ngrx/owners.actions";

@Directive()
export class CreateOwnerComponent implements OnInit {

  formGroup!: FormGroup<Owner_Form>;

  constructor(protected formBuilder: FormBuilder, private store: Store) { }

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
    const owner = formatOwnerFormValueToEstatePostRequest(this.formGroup) ;
    this.store.dispatch(addOwner({ owner }))
  }

}
