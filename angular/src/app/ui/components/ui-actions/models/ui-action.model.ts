export interface UiAction {
  label?: string;
  icon?: string;
  command: () => void;
}