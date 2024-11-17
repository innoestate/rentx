import { FormControl } from "@angular/forms";
export interface Estate_Form {
  street: FormControl<string>;
  city: FormControl<string>;
  zip: FormControl<string>;
  rent: FormControl<number | null>;
  charges: FormControl<number | null>;
  owner: FormControl<string | null>;
  lodger: FormControl<string | null>;
}
