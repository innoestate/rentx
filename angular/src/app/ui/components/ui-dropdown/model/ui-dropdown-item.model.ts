import { UiItem } from "src/app/ui/models/ui-item.model";

export interface UiDropdownItem<T> extends UiItem {
  label: string;
  readonly value: T;
}

export const isUiDropdownItem = (value: any): boolean => (
  value !== null &&
  typeof value === 'object' &&
  'value' in value &&
  'label' in value
);
