import { AbstractControl } from "@angular/forms";

export interface FormGroupObject {
  [key: string]: AbstractControl<any, any>;
}
