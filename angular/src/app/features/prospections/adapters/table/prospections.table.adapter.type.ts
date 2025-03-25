import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";

interface UiTableColumnCity extends UiTableColumnItem {
  key: 'city';
  label: string;
}

interface UiTableColumnZip extends UiTableColumnItem {
  key: 'zip';
  label: string;
}

interface UiTableColumnStreet extends UiTableColumnItem {
  key: 'street';
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
  dropDownItems: UiDropdownItem<any>[];
}

export type UiTableColumnsProspections = [UiTableColumnCity, UiTableColumnZip, UiTableColumnStreet, UiTableColumnLink, UiTableColumnSeller, UiTableColumnPrice, UiTableColumnStatus, UiTableColumnActions];

export interface UiTableRowProspections extends UiTableRow {
  data: {
    id: string
  },
  cells: {}
}

export interface UiTableProspections extends UiTable {
  columns: UiTableColumnsProspections;
  rows: UiTableRowProspections[];
}
