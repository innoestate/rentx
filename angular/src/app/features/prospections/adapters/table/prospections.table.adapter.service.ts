import { Injectable } from "@angular/core";
import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { UiDropdownItem } from "src/app/ui/components/ui-dropdown/model/ui-dropdown-item.model";
import { UiTableAdapter } from "src/app/ui/components/ui-table/adapter/ui-table.adapter";
import { CellType } from "src/app/ui/components/ui-table/types/ui-table.cell.type";
import { Prospection_Dto } from "../../models/prospection.dto.model";
import { PROSPECTION_STATUS } from "../../models/prospection.status.model";
import { UiTableColumnSeller, UiTableColumnsProspections, UiTableProspections, UiTableRowProspection } from "./prospections.table.adapter.type";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { Localizations } from "src/app/core/localizations/localizations";

@Injectable({
  providedIn: 'root'
})
export class ProspectionsTableAdapterService extends UiTableAdapter {

  constructor(private localization: LocalizationsService) {
    super();
  }

  buildTable(prospections: Prospection_Dto[], sellers: Seller_Dto[]): UiTableProspections {
    return {
      columns: this.createColumns(sellers),
      rows: this.createRows(prospections, sellers)
    }
  }

  getDtoFromRow(row: UiTableRowProspection): Partial<Prospection_Dto> {
    const data: any = {...row.cells }
    if(data['seller']){
      data['seller_id'] = data['seller'].value
      delete data.seller;
    }
    if(data['status']){
      data['status'] = data['status'].value
    }
    return data;
  }

  protected createColumns(sellers: Seller_Dto[]): UiTableColumnsProspections {
    return [
      { key: 'city', label: 'Ville', editable: true, type: 'text', sort: 1  },
      { key: 'zip', label: 'Code postal', editable: true, type: 'text', sort: 1 },
      { key: 'address', label: 'Rue', editable: true, type: 'text' },
      { key: 'link', label: 'lien', editable: true, type: 'text' },
      this.buildSellersColumn(sellers),
      { key: 'price', label: 'Prix', editable: true, type: 'text' },
      { key: 'status', label: 'Status', type: 'dropdown', dropDownItems: this.buildStatusDropdownItems() },
      {
        key: 'actions', label: '', icon: 'setting', type: 'dropdown', dropDownItems: this.buildActionsDropdownColumn(), dropDownCellsUniqueItem: {
          label: '',
          icon: 'down-circle',
          value: 'action',
        },
        command: () => {}
      }
    ]
  }

  protected createRows(prospections: Prospection_Dto[], sellers: Seller_Dto[]): UiTableRowProspection[] {
    return prospections.map(prospection => this.extractRow(prospection, sellers))
  }

  private buildActionsDropdownColumn(): UiDropdownItem<any>[] {
    return [
      {
        label: this.localization.getLocalization('commons', 'delete'),
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
      icon: status.icon,
      color: status.color
    }))
  }

  private buildSellersColumn(sellers: Seller_Dto[]): UiTableColumnSeller {
    return {
      key: 'seller',
      label: 'Vendeur',
      editable: true,
      dropDownItems: this.buildSellersDropdownColumn(sellers),
      type: 'dropdown'
    }
  }

  private buildSellersDropdownColumn(sellers: Seller_Dto[]): UiDropdownItem<any>[] {
    return sellers.map(seller => ({
      label: seller.name,
      value: seller.id
    }))
  }

  private extractRow(prospection: Prospection_Dto, sellers: Seller_Dto[]): UiTableRowProspection {
    return {
      data: {
        id: prospection.id!
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
      value: '',
      color: ''
    };
    const status = PROSPECTION_STATUS.find(status => status.key === statusKey);
    return {
      label: status?.shortLabel ?? '',
      icon: status?.icon ?? '',
      value: status?.key ?? '',
      color: status?.color ?? ''
    }
  }

}
