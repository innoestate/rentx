import { Injectable } from "@angular/core";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";
import { Seller_Dto } from "../models/seller.dto.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { SellersCommandsService } from "../commands/sellers.commands.service";

@Injectable({
  providedIn: 'root'
})
export class SellersTableAdapterService {

  constructor(private sellersCommands: SellersCommandsService) { }

  buildTable(sellers: Seller_Dto[]): UiTable {
    return {
      columns: this.createColumns(),
      rows: this.createRows(sellers)
    }
  }

  private createColumns(): UiTableColumnItem[] {
    return [
      { key: 'name', label: 'Nom', editable: true },
      { key: 'street', label: 'Rue', editable: true },
      { key: 'city', label: 'Ville', editable: true },
      { key: 'zip', label: 'Code postal', editable: true },
      { key: 'phone', label: 'téléphone', editable: true },
      { key: 'email', label: 'email', editable: true },
      { key: 'agency', label: 'Agence', editable: true },
      { key: 'actions', label: 'Actions', dropDownItems: this.buildActionsDropdownColumn()}
    ]
  }

  private buildActionsDropdownColumn(): UiDropdownItem<any>[] {
    return [
      {
        label: 'Supprimer',
        icon: 'delete',
        value: "delete",
        command: (row: UiTableRow) => {
          this.sellersCommands.delete(row.data.id);
          return true;
        }
      }
    ]
  }

  private createRows(sellers: Seller_Dto[]): UiTableRow[] {
    return sellers.map(seller => this.extractRow(seller));
  }

  private extractRow(seller: Seller_Dto): UiTableRow {
    return {
      data: { id: seller.id },
      cells: {
        name: seller.name,
        street: seller.address??'',
        city: seller.city??'',
        zip: seller.zip??'',
        phone: seller.phone??'',
        email: seller.email??'',
        agency: seller.agency??'',
        actions: {
          value: '',
          label: "action",
          icon: "delete"
        }
      }
    }
  }

}
