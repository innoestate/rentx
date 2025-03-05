import { Directive, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Estate_Form } from "src/app/estates/models/estate-form.model";
import { createEstate } from "src/app/estates/data/ngrx/estates.actions";
import { selectOwners } from "src/app/owners/data/ngrx/owners.selectors";
import { formatEstateToEstateFormToEstatePostRequest } from "src/app/core/utils/estate.utils";

@Directive()
export class CreateEstateComponent implements OnInit {

  formGroup!: FormGroup<Estate_Form>;
  owners = this.store.selectSignal(selectOwners);

  constructor(protected formBuilder: FormBuilder, private store: Store) {}

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
      owner_id: new FormControl(this.owners().length ? this.owners()[0].id : null),
      lodger: new FormControl(''),
    } as Estate_Form);
  }

  create() {
    if (this.formGroup.invalid)
      return;
    const estate = formatEstateToEstateFormToEstatePostRequest(this.formGroup);
    this.store.dispatch(createEstate({ estate }))
  }

}
