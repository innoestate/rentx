export interface UxDropdownItem<T> {
  label: string;
  readonly target: T;
  items?: UxDropdownItem<T>[];
}
