import { UiCell } from "./ui-cell.model";

export interface UiTableRow {
  data: any,//CAREFULL: need at least an id
  cells: { [key: string]: UiCell }
}
