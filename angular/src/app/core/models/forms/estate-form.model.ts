import { FormControl } from "@angular/forms";
import { Owner } from "../owner.model";
export interface Estate_Form {
  street: FormControl<string>;
  city: FormControl<string>;
  zip: FormControl<string>;
  rent: FormControl<number | null>;
  charges: FormControl<number | null>;
  owner: FormControl<string | Owner | null >;
  lodger: FormControl<string>;
}
