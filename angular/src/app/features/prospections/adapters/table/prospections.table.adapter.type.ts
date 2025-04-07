import { NzTableFilterFn } from "ng-zorro-antd/table";
import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiNestedDropdown } from "src/app/ui/components/ui-nested-dropdown/model/ui-nested-dropdown.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { Priority, UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";

export interface UiTableColumnCity extends UiTableColumnItem {
  key: 'city';
  label: string;
  sort: 1;
  filter: {text: string, value: string}[];
  filterFn: NzTableFilterFn<UiTableRow>
}

interface UiTableColumnZip extends UiTableColumnItem {
  key: 'zip';
  label: string;
  sort: 1;
}

interface UiTableColumnAddress extends UiTableColumnItem {
  key: 'address';
  label: string;
}

interface UiTableColumnLink extends UiTableColumnItem {
  key: 'link';
  label: string;
}

export interface UiTableColumnSeller extends UiTableColumnItem {
  key: 'seller';
  label: string;
  editable: true;
  dropdown: UiNestedDropdown;
}

interface UiTableColumnPrice extends UiTableColumnItem {
  key: 'price';
  label: string;
  editable: true;
}

export interface UiTableColumnStatus extends UiTableColumnItem {
  key: 'status';
  label: string;
  dropdown: UiNestedDropdown;
  sort: Priority;
  filter: {text: string, value: string}[];
  filterFn: NzTableFilterFn<UiTableRow>;
}

interface UiTableColumnActions extends UiTableColumnItem {
  key: 'actions';
  label: string;
  icon: string;
  dropdown: UiNestedDropdown;
  dropDownCellsUniqueItem: UiDropdownItem<any>;
  command: (row: UiTableRowProspection) => void;
}

export type UiTableColumnsProspections = [UiTableColumnCity,
  UiTableColumnZip,
  UiTableColumnAddress,
  UiTableColumnLink,
  UiTableColumnSeller,
  UiTableColumnPrice,
  UiTableColumnStatus,
  UiTableColumnActions];

export interface UiTableRowProspection extends UiTableRow {
  data: {
    id: string
  },
}

export interface UiTableProspections extends UiTable {
  columns: UiTableColumnsProspections;
  rows: UiTableRowProspection[];
}


export const prospectionsColumnModel: UiTableColumnsProspections = [
  { key: 'city', label: 'Ville', editable: true, type: 'text', sort: 1, filter: [], filterFn: (() => {}) as any },
  { key: 'zip', label: 'Code postal', editable: true, type: 'text', sort: 1 },
  { key: 'address', label: 'Rue', editable: true, type: 'text' },
  { key: 'link', label: 'lien', editable: true, type: 'text' },
  { key: 'seller', label: 'Vendeur', editable: true, dropdown: {list: []}, type: 'dropdown' },
  { key: 'price', label: 'Prix', editable: true, type: 'number' },
  { key: 'status', label: 'Status', dropdown: {list: []}, type: 'dropdown', sort: 1, filter: [], filterFn: (() => {}) as any },
  {
    key: 'actions', label: 'Actions', icon: 'down-circle', type: 'dropdown', dropdown: {list: []}, dropDownCellsUniqueItem: {
      label: '',
      icon: 'down-circle',
      value: 'action'
    },
    command: () => {}
  }
]

