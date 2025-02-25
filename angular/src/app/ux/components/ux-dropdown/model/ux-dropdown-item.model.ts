export interface UxDropdownItem<T> {
  label: string;
  readonly target: T;
  command?: () => boolean;
}
