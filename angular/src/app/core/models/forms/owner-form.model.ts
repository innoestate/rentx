import { FormControl } from "@angular/forms";
export interface Owner_Form {
  name: FormControl<string>;
  street: FormControl<string>;
  city: FormControl<string>;
  zip: FormControl<string>;
  signature: FormControl<string>;
}
