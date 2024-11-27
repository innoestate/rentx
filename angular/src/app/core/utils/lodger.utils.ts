import { FormGroup } from "@angular/forms";
import { Lodger_Form } from "../models/forms/lodger-form.model";

export const formatLodgerFormValueToEstatePostRequest = (formGroup: FormGroup<Lodger_Form>) => {
  return {
    name: formGroup.get('name')!.value,
    email: formGroup.get('email')!.value,
  }
}
