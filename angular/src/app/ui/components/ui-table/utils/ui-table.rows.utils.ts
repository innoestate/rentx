import { NzUiCell } from "../models/nz-ui-cell.model";
import { NzUiTable2Row } from "../models/nz-ui-table-row.model";
import { UiTable2Row } from "../models/ui-table-row.model";
import { UiTable2Column } from "../models/ui-table.column.model";

export const formatNzRows = (rows: UiTable2Row[], columns: UiTable2Column[]): NzUiTable2Row[] => {
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
