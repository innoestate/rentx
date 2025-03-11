import { Injectable } from "@angular/core";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";
import { Prospection_Dto } from "../models/prospection.dto.model";
import { getUpdatedFields } from "../../core/utils/objects.utils";
import { ProspectionsCommandsService } from "../commands/prospections.commands.service";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";

@Injectable({
  providedIn: 'root'
})
export class ProspectionsTableAdapter {

  constructor(private prospectionsCommands: ProspectionsCommandsService) { }

  buildTable(prospections: Prospection_Dto[]): UiTable {
    return {
      columns: this.createColumns(),
      rows: this.createRows(prospections)
    }
  }

  getModifications(previusProspection: Prospection_Dto, row: UiTableRow): Partial<Prospection_Dto> {
    const potentialModifications = {
      city: row.cells['city'] as string,
      zip: row.cells['zip'] as string,
      address: row.cells['address'] as string,
      link: row.cells['link'] as string,
      // seller_id: row.cells['seller_id'] as string,
      price: row.cells['price'] as number,
      // status: row.cells['status'] as string
    }
    return getUpdatedFields(previusProspection, potentialModifications as any)
  }

  private createColumns(): UiTableColumnItem[] {
    return [
      { key: 'city', label: 'Ville', editable: true },
      { key: 'zip', label: 'Code postal', editable: true },
      { key: 'street', label: 'Rue', editable: true },
      { key: 'link', label: 'lien', editable: true},
      { key: 'seller_id', label: 'Vendeur' },
      { key: 'price', label: 'Prix', editable: true },
      { key: 'status', label: 'Status' },
      { key: 'actions', label: 'Actions', dropDownItems: this.buildActionsDropdownColumn() }
    ]
  }

  private buildActionsDropdownColumn(): UiDropdownItem<any>[] {
    return [
      {
        label: 'Supprimer',
        icon: 'delete',
        value: "delete",
        command: (row: UiTableRow) => {
          this.prospectionsCommands.delete(row.data.id);
          return true;
        }
      }
    ]
  }

  private createRows(prospections: Prospection_Dto[]): UiTableRow[] {
    return prospections.map( prospection => this.formatUiTableRow(prospection))
  }

  private formatUiTableRow(prospection: Prospection_Dto): UiTableRow {
    return {
      data: {
        id: prospection.id
      },
      cells: {
        city: prospection.city??'',
        zip: prospection.zip??'',
        address: prospection.address??'',
        link: prospection.link??'',
        seller_id: prospection.seller_id??'',
        price: prospection.price??0,
        status: prospection.status??'',
        actions: {
          value: '',
          label: "action",
          icon: "delete"
        }
      }
    }
  }

}
