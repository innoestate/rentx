import { Directive, OnInit } from "@angular/core";
import { Form, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Estate_Form } from "src/app/core/models/forms/estate-form.model";
import { createEstate } from "src/app/core/store/estate/estates.actions";
import { formatEstateToEstateFormToEstatePostRequest } from "src/app/core/utils/estate.utils";

@Directive()
export class CreateEstateComponent implements OnInit{

  formGroup!: FormGroup<Estate_Form>;

  constructor(protected formBuilder: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup() {
    this.formGroup = new FormGroup({
      street: new FormControl('', [Validators.required]) as FormControl<string>,
      city: new FormControl('', [Validators.required]) as FormControl<string>,
      zip: new FormControl('', [Validators.required]) as FormControl<string>,
      rent: new FormControl(0),
      charges: new FormControl(0),
      owner: new FormControl(''),
      lodger: new FormControl('')
    })
  }

  create() {
    if (this.formGroup.invalid)
      return;
    const estate = formatEstateToEstateFormToEstatePostRequest(this.formGroup);
    this.store.dispatch(createEstate({ estate }))
  }

}
