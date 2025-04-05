import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";

interface UiTableColumnCity extends UiTableColumnItem {
  key: 'city';
  label: string;
  sort: 1;
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
  dropDownItems: UiDropdownItem<Seller_Dto>[];
}

interface UiTableColumnPrice extends UiTableColumnItem {
  key: 'price';
  label: string;
  editable: true;
}

interface UiTableColumnStatus extends UiTableColumnItem {
  key: 'status';
  label: string;
  dropDownItems: UiDropdownItem<any>[];
}

interface UiTableColumnActions extends UiTableColumnItem {
  key: 'actions';
  label: string;
  icon: string;
  dropDownItems: UiDropdownItem<any>[];
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
  { key: 'city', label: 'Ville', editable: true, type: 'text', sort: 1 },
  { key: 'zip', label: 'Code postal', editable: true, type: 'text', sort: 1 },
  { key: 'address', label: 'Rue', editable: true, type: 'text' },
  { key: 'link', label: 'lien', editable: true, type: 'text' },
  { key: 'seller', label: 'Vendeur', editable: true, dropDownItems: [], type: 'dropdown' },
  { key: 'price', label: 'Prix', editable: true, type: 'number' },
  { key: 'status', label: 'Status', dropDownItems: [], type: 'dropdown' },
  {
    key: 'actions', label: 'Actions', icon: 'tool', type: 'dropdown', dropDownItems: [], dropDownCellsUniqueItem: {
      label: '',
      icon: 'tool',
      value: 'action'
    },
    command: () => {}
  }
]

