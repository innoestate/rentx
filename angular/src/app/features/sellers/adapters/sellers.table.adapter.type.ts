import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiNestedDropdown } from "src/app/ui/components/ui-nested-dropdown/model/ui-nested-dropdown.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";

interface UiTableColumnName extends UiTableColumnItem {
  key: 'name';
  label: string;
  editable: true;
}

interface UiTableColumnAddress extends UiTableColumnItem {
  key: 'address';
  label: string;
  editable: true;
}

interface UiTableColumnCity extends UiTableColumnItem {
  key: 'city';
  label: string;
  editable: true;
}

interface UiTableColumnZip extends UiTableColumnItem {
  key: 'zip';
  label: string;
  editable: true;
}

interface UiTableColumnPhone extends UiTableColumnItem {
  key: 'phone';
  label: string;
  editable: true;
}

interface UiTableColumnEmail extends UiTableColumnItem {
  key: 'email';
  label: string;
  editable: true;
}

interface UiTableColumnAgency extends UiTableColumnItem {
  key: 'agency';
  label: string;
  editable: true;
}

interface UiTableColumnActions extends UiTableColumnItem {
  key: 'actions';
  label: string;
  dropdown: UiNestedDropdown;
  headDropdown: UiNestedDropdown;
  command: () => void
}

export type UiTableColumnsSellers = [UiTableColumnName, UiTableColumnAddress, UiTableColumnCity, UiTableColumnZip, UiTableColumnPhone, UiTableColumnEmail, UiTableColumnAgency, UiTableColumnActions]

export interface UiTableRowSellers extends UiTableRow {
  data: {
    id: string;
  };
}

export interface UiTableSellers extends UiTable {
  columns: UiTableColumnsSellers;
  rows: UiTableRowSellers[];
}
