import { UiCell } from "./ui-cell.model";

export interface NzUiCell extends UiCell {
  key: string;
  internal?: boolean;
}
