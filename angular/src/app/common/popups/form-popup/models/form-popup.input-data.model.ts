import { FormPopupFieldData } from "./form-popup.fields-data.model";

export interface FormPopupFieldsData<T> {
  value?: T,
  fields: FormPopupFieldData[],
  onValidate: (createdObject: T, performedActionSuccessfullCallback?: () => void ) => void
}
