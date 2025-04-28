import { NzUiCell } from "../models/nz-ui-cell.model";
import { NzUiTableRow } from "../models/nz-ui-table-row.model";
import { UiTableRow } from "../models/ui-table-row.model";
import { UiTableColumn } from "../models/ui-table.column.model";

export const formatNzRows = (rows: UiTableRow[], columns: UiTableColumn[]): NzUiTableRow[] => {
  return rows.map((row, index) => {
    const orderedRows: NzUiCell[] = [];
    columns.forEach((column) => {

      const cell: NzUiCell = { ...row.cells[column.key], key: column.key }

      if (cell.label?.icon) {
        cell.label.icon = {
          size: 18,
          color: 'var(--color-tertiary-500)',
          ...cell.label.icon,
        };
      }

      orderedRows.push(cell);
    });
    return { inputRowIndex: index, id: row.data.id, cells: orderedRows };
  });
}
