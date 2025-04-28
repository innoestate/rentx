import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { Seller } from "src/app/features/sellers/models/seller.model";
import { UiNestedDropdown } from "src/app/ui/components/ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiCellBasic } from "src/app/ui/components/ui-table/models/ui-cell.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumn } from "src/app/ui/components/ui-table/models/ui-table.column.model";

interface SellerTable extends UiTableRow {
  cells: {
    name: UiCellBasic,
    address: UiCellBasic,
    zip: UiCellBasic,
    city: UiCellBasic,
    email: UiCellBasic,
    phone: UiCellBasic,
    agency: UiCellBasic,
    actions: UiCellBasic,
  }
}

@Injectable({
  providedIn: 'root'
})
export class SellersTableAdapterService {

  constructor(private localization: LocalizationsService) { }

  createColumns(): UiTableColumn[] {
    return [
      {
        key: 'name',
        cell: { type: 'mediumString', sort: { priority: 1 }, label: { title: { label: 'Nom Prénom / raison sociale' } } },
      },
      {
        key: 'address',
        cell: { type: 'string', sort: { priority: 2 }, editable: true, label: { title: { label: 'Adresse' } } },
      },
      {
        key: 'zip',
        cell: { type: 'string', sort: { priority: 3 }, editable: true, label: { title: { label: 'Code Postal' } } },
      },
      {
        key: 'city',
        cell: { type: 'string', sort: { priority: 4 }, editable: true, label: { title: { label: 'Ville' } } },
      },
      {
        key: 'email',
        cell: { type: 'string', sort: { priority: 5 }, editable: true, label: { title: { label: 'Email' } } },
      },
      {
        key: 'phone',
        cell: { type: 'string', sort: { priority: 6 }, editable: true, label: { title: { label: 'Téléphone' } } },
      },
      {
        key: 'agency',
        cell: { type: 'string', sort: { priority: 7 }, editable: true, label: { title: { label: 'Agence' } } },
      },
      {
        key: 'actions',
        cell: { type: 'dropdown-actions-icon', dropdown: this.buildColumnActions() },
      }
    ];
  }

  createRows(sellers: Seller[]): UiTableRow[] {
    return sellers.map(seller => this.formatUiTableRow(seller));
  }

  getEditableValue(key: string, cell: UiCellBasic): Partial<Seller> {
    const updates: any = {};
    updates[key] = cell.label?.title?.label;
    return updates;
  }

  private buildRowActions(): UiNestedDropdown {
    return {
      label: {
        icon: { name: 'down', size: 18, color: 'var(--color-tertiary-500)' },
      },
      list: [
        {
          label: {
            icon: { name: 'trash', size: 18, color: 'var(--color-error-300)'},
            title: { label: 'supprimer' },
            command: () => {
              console.log('implement command here');
              return true;
            }
          },
        }
      ]
    }
  }

  private buildColumnActions(): UiNestedDropdown {
    return {
      label: {
        icon: { name: 'gear', size: 24, color: 'var(--color-secondary-500)' },
      },
      list: [
        {
          label: {
            icon: { name: 'add-owner', size: 22, color: 'var(--color-secondary-500)'},
            title: { label: this.localization.getLocalization('sellers', 'create') },
            command: () => {
              console.log('implement command here');
              return true;
            }
          },
        }
      ]
    }
  }

  formatUiTableRow(seller: Seller): SellerTable {
    return {
      data: { id: seller.id },
      cells: {
        name: { type: 'string', editable: true, label: { title: { label: seller.name }} },
        address: { type: 'string', editable: true, label: { title: { label: seller.address ?? '' }} },
        zip: { type: 'string', editable: true, label: { title: { label: seller.zip ?? '' }} },
        city: { type: 'string', editable: true, label: { title: { label: seller.city ?? '' }} },
        email: { type: 'string', editable: true, label: { title: { label: seller.email ?? '' }} },
        phone: { type: 'string', editable: true, label: { title: { label: seller.phone ?? '' }} },
        agency: { type: 'string', editable: true, label: { title: { label: seller.agency ?? '' }} },
        actions: { type: 'dropdown-actions', dropdown: this.buildRowActions() },
      },
    }
  }
}
