import { Directive, Inject, Input, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { NZ_MODAL_DATA } from "ng-zorro-antd/modal";
import { Estate } from "src/app/core/models/estate.model";
import { Lodger_Form } from "src/app/core/models/forms/lodger-form.model";
import { editEstate } from "src/app/core/store/estate/estates.actions";
import { createLodger } from "src/app/core/store/lodger/lodgers.actions";
import { formatLodgerFormValueToEstatePostRequest } from "src/app/core/utils/lodger.utils";

@Directive()
export class CreateLodgerComponent implements OnInit {

  formGroup!: FormGroup<Lodger_Form>;

  constructor(@Inject(NZ_MODAL_DATA) public data: { estate: Estate }, protected formBuilder: FormBuilder, private store: Store, private actions$: Actions) { }

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
    this.store.dispatch(createLodger({ lodger, estateId: this.data.estate?.id }));
  }

}
