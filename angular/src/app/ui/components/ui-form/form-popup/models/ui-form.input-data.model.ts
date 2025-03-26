import { UiFormFieldData } from "./ui-form.field-data.model";

export interface UiFormFieldsData<T> {
  value?: T,
  fields: UiFormFieldData[],
  onValidate: (createdObject: T, performedActionSuccessfullCallback?: () => void ) => void
}
