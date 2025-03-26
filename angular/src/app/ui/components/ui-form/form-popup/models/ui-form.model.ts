import { AbstractControl } from "@angular/forms";

export interface UiFormObject {
  [key: string]: AbstractControl<any, any>;
}
