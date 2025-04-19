import { UiLabel } from "./ui-label.model";

export interface UiTable2Row {
  data: any,
  cells: { [key: string]: UiLabel }
}
