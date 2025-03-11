import { Injectable } from "@angular/core";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";
import { Prospection_Dto } from "../models/prospection.dto.model";
import { getUpdatedFields } from "../../core/utils/objects.utils";
import { ProspectionsCommandsService } from "../commands/prospections.commands.service";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { Seller_Dto } from "src/app/sellers/models/seller.dto.model";

@Injectable({
  providedIn: 'root'
})
export class ProspectionsTableAdapter {

  constructor(private prospectionsCommands: ProspectionsCommandsService) { }

  buildTable(prospections: Prospection_Dto[], sellers: Seller_Dto[]): UiTable {
    return {
      columns: this.createColumns(sellers),
      rows: this.createRows(prospections, sellers)
    }
  }

  getModifications(previusProspection: Prospection_Dto, row: UiTableRow): Partial<Prospection_Dto> {
    const potentialModifications = {
      city: row.cells['city'] as string,
      zip: row.cells['zip'] as string,
      address: row.cells['address'] as string,
      link: row.cells['link'] as string,
      seller_id: (row.cells['seller'] as any).value,
      price: row.cells['price'] as number,
      // status: row.cells['status'] as string
    }
    return getUpdatedFields(previusProspection, potentialModifications as any)
  }

  private createColumns(sellers: Seller_Dto[]): UiTableColumnItem[] {
    return [
      { key: 'city', label: 'Ville', editable: true },
      { key: 'zip', label: 'Code postal', editable: true },
      { key: 'street', label: 'Rue', editable: true },
      { key: 'link', label: 'lien', editable: true},
      this.buildSellersColumn(sellers),
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

  private buildSellersColumn(sellers: Seller_Dto[]): UiTableColumnItem {
    return {
      key: 'seller',
      label: 'Vendeur',
      editable: true,
      dropDownItems: this.buildSellersDropdownColumn(sellers)
    }
  }

  private buildSellersDropdownColumn(sellers: Seller_Dto[]): UiDropdownItem<any>[] {
    return sellers.map( seller => ({
      label: seller.name,
      value: seller.id
    }))
  }

  private createRows(prospections: Prospection_Dto[], sellers: Seller_Dto[]): UiTableRow[] {
    return prospections.map( prospection => this.formatUiTableRow(prospection, sellers))
  }

  private formatUiTableRow(prospection: Prospection_Dto, sellers: Seller_Dto[]): UiTableRow {
    return {
      data: {
        id: prospection.id
      },
      cells: {
        city: prospection.city??'',
        zip: prospection.zip??'',
        address: prospection.address??'',
        link: prospection.link??'',
        seller: {
          value: prospection.seller_id??'',
          label: sellers.find( seller => seller.id === prospection.seller_id )?.name??''
        },
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
