import { UiIcon } from "./ui-icon.model";

export interface UiLabel {
  title?: {
    label: string;
    color?: string;
    weight?: 'bold';
  };
  icon?: UiIcon;
}