import { Seller_Dto } from "src/app/sellers/models/seller.dto.model";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";

interface CityColumn extends UiTableColumnItem {
  key: 'city';
  label: string;
}

interface ZipColumn extends UiTableColumnItem {
  key: 'zip';
  label: string;
}

interface StreetColumn extends UiTableColumnItem {
  key: 'street';
  label: string;
}

interface LinkColumn extends UiTableColumnItem {
  key: 'link';
  label: string;
}

export interface SellerColumn extends UiTableColumnItem {
  key: 'seller';
  label: string;
  editable: true;
  dropDownItems: UiDropdownItem<Seller_Dto>[];
}

interface PriceColumn extends UiTableColumnItem {
  key: 'price';
  label: string;
  editable: true;
}

interface StatusColumn extends UiTableColumnItem {
  key: 'status';
  label: string;
  dropDownItems: UiDropdownItem<any>[];
}

interface ActionColumn extends UiTableColumnItem {
  key: 'actions';
  label: string;
  dropDownItems: UiDropdownItem<any>[];
}

export type ProspectionsColumns = [CityColumn, ZipColumn, StreetColumn, LinkColumn, SellerColumn, PriceColumn, StatusColumn, ActionColumn];

export interface UiTableRowProspections extends UiTableRow {
  data: {
    id: string
  },
  cells: {}
}

export interface UiTableProspection extends UiTable {
  columns: ProspectionsColumns;
  rows: UiTableRowProspections[];
}
