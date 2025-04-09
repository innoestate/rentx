import { Injectable } from "@angular/core";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiTableAdapter } from "src/app/ui/components/ui-table/adapter/ui-table.adapter";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { Seller_Dto } from "../models/seller.dto.model";
import { UiTableColumnsSellers, UiTableSellers } from "./sellers.table.adapter.type";
import { UiNestedDropdown } from "src/app/ui/components/ui-nested-dropdown/model/ui-nested-dropdown.model";

@Injectable({
  providedIn: 'root'
})
export class SellersTableAdapterService extends UiTableAdapter {

  constructor() {
    super();
  }

  buildTable(sellers: Seller_Dto[]): UiTableSellers {
    return {
      columns: this.createColumns(),
      rows: this.createRows(sellers)
    }
  }

  getDtoFromRow(row: UiTableRow): Partial<Seller_Dto> {
    if (!row.data['id']) throw new Error('Need an id in row data.');
    const data: any = { id: row.data['id'], ...row.cells }
    return data;
  }

  protected createColumns(): UiTableColumnsSellers {
    return [
      { key: 'name', label: 'Nom', editable: true, type: 'text' },
      { key: 'address', label: 'Rue', editable: true, type: 'text' },
      { key: 'city', label: 'Ville', editable: true, type: 'text' },
      { key: 'zip', label: 'Code postal', editable: true, type: 'text' },
      { key: 'phone', label: 'téléphone', editable: true, type: 'text' },
      { key: 'email', label: 'email', editable: true, type: 'text' },
      { key: 'agency', label: 'Agence', editable: true, type: 'text' },
      { key: 'actions', label: 'Actions', type: 'dropdown', dropdown: this.buildActionsDropdownColumn() }
    ]
  }

  protected createRows(sellers: Seller_Dto[]): UiTableRow[] {
    return sellers.map(seller => this.extractRow(seller));
  }

  private buildActionsDropdownColumn(): UiNestedDropdown {
    return {
      list: [
        {
          label: 'Supprimer',
          icon: 'trash',
          value: "delete",
          command: (row: UiTableRow) => {
            // this.sellersCommands.delete(row.data.id);
            return true;
          }
        }
      ]
    }
  }

  private extractRow(seller: Seller_Dto): UiTableRow {
    return {
      data: { id: seller.id },
      cells: {
        name: seller.name,
        address: seller.address ?? '',
        city: seller.city ?? '',
        zip: seller.zip ?? '',
        phone: seller.phone ?? '',
        email: seller.email ?? '',
        agency: seller.agency ?? '',
        actions: {
          value: '',
          label: "action",
          icon: "trash"
        }
      }
    }
  }

}
