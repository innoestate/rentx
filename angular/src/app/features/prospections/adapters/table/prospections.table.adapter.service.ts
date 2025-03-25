import { Injectable } from "@angular/core";
import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiTableAdapter } from "src/app/ui/components/ui-table/adapter/ui-table.adapter";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { CellType } from "src/app/ui/components/ui-table/types/ui-table.cell.type";
import { Prospection_Dto } from "../../models/prospection.dto.model";
import { PROSPECTION_STATUS } from "../../models/prospection.status.model";
import { UiTableColumnsProspections, UiTableColumnSeller, UiTableProspections, UiTableRowProspection } from "./prospections.table.adapter.type";

@Injectable({
  providedIn: 'root'
})
export class ProspectionsTableAdapterService extends UiTableAdapter {

  constructor() {
    super();
  }

  buildTable(prospections: Prospection_Dto[], sellers: Seller_Dto[]): UiTableProspections {
    return {
      columns: this.createColumns(sellers),
      rows: this.createRows(prospections, sellers)
    }
  }

  getDtoFromRow(row: UiTableRowProspection): Partial<Prospection_Dto> {
    const data: any = { id: row.data['id'], ...row.cells }
    if(data['seller']){
      data['seller_id'] = data['seller'].value
      delete data.seller;
    }
    return data;
  }

  protected createColumns(sellers: Seller_Dto[]): UiTableColumnsProspections {
    return [
      { key: 'city', label: 'Ville', editable: true },
      { key: 'zip', label: 'Code postal', editable: true },
      { key: 'street', label: 'Rue', editable: true },
      { key: 'link', label: 'lien', editable: true },
      this.buildSellersColumn(sellers),
      { key: 'price', label: 'Prix', editable: true },
      { key: 'status', label: 'Status', dropDownItems: this.buildStatusDropdownItems() },
      {
        key: 'actions', label: 'Actions', dropDownItems: this.buildActionsDropdownColumn(), dropDownCellsUniqueItem: {
          label: '',
          icon: 'tool',
          value: 'action'
        }
      }
    ]
  }

  protected createRows(prospections: Prospection_Dto[], sellers: Seller_Dto[]): UiTableRowProspection[] {
    return prospections.map(prospection => this.formatUiTableRow(prospection, sellers))
  }

  protected buildActionsDropdownColumn(): UiDropdownItem<any>[] {
    return [
      {
        label: 'Supprimer',
        icon: 'delete',
        value: "delete",
        command: () => {
          console.log('implement command here');
          return true;
        }
      }
    ]
  }

  private buildStatusDropdownItems(): UiDropdownItem<any>[] {
    return PROSPECTION_STATUS.map(status => ({
      label: status.shortLabel,
      value: status.key,
      icon: status.icon
    }))
  }

  private buildSellersColumn(sellers: Seller_Dto[]): UiTableColumnSeller {
    return {
      key: 'seller',
      label: 'Vendeur',
      editable: true,
      dropDownItems: this.buildSellersDropdownColumn(sellers)
    }
  }

  private buildSellersDropdownColumn(sellers: Seller_Dto[]): UiDropdownItem<any>[] {
    return sellers.map(seller => ({
      label: seller.name,
      value: seller.id
    }))
  }

  private formatUiTableRow(prospection: Prospection_Dto, sellers: Seller_Dto[]): UiTableRow {
    return {
      data: {
        id: prospection.id
      },
      cells: {
        city: prospection.city ?? '',
        zip: prospection.zip ?? '',
        address: prospection.address ?? '',
        link: prospection.link ?? '',
        seller: {
          value: prospection.seller_id ?? '',
          label: sellers.find(seller => seller.id === prospection.seller_id)?.name ?? ''
        },
        price: prospection.price ?? 0,
        status: this.getStatusValue(prospection.status),
        actions: ''
      }
    }
  }

  private getStatusValue(statusKey?: string): CellType {
    if (!statusKey) return {
      label: '',
      icon: '',
      value: ''
    };
    const status = PROSPECTION_STATUS.find(status => status.key === statusKey);
    return {
      label: status?.shortLabel ?? '',
      icon: status?.icon ?? '',
      value: status?.key ?? ''
    }
  }

}
