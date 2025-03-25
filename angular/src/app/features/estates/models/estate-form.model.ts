import { FormControl } from "@angular/forms";
export interface Estate_Form {
  street: FormControl<string>;
  city: FormControl<string>;
  zip: FormControl<string>;
  plot: FormControl<string>;
  rent: FormControl<number | null>;
  charges: FormControl<number | null>;
  owner_id: FormControl<string | null >;
  lodger: FormControl<string>;
}
