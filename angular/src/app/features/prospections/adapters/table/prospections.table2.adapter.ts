import { Injectable } from "@angular/core";
import { NzTableFilterValue } from "ng-zorro-antd/table";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { Seller_Dto } from "src/app/features/sellers/models/seller.dto.model";
import { PropertyCategory } from "src/app/shared/models/property-category.model";
import { UiNestedDropdown } from "src/app/ui/components/ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { NzUiCell } from "src/app/ui/components/ui-table/models/nz-ui-cell.model";
import { NzUiTableRow } from "src/app/ui/components/ui-table/models/nz-ui-table-row.model";
import { UiCellBasic, UiCellDropdown } from "src/app/ui/components/ui-table/models/ui-cell.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumn } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { Prospection_Dto } from "../../models/prospection.dto.model";
import { PROSPECTION_STATUS } from "../../models/prospection.status.model";

interface ProspectionTableRow extends UiTableRow {
  data: { id: string };
  cells: {
    property_category: UiCellDropdown,
    city: UiCellBasic,
    zip: UiCellBasic,
    address: UiCellBasic,
    link: UiCellBasic,
    seller: UiCellDropdown,
    price: UiCellBasic,
    status: UiCellDropdown,
    actions: UiCellBasic
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProspectionsTable2AdapterService {

  constructor(private localization: LocalizationsService) { }

  createColumns(prospections: Prospection_Dto[]): UiTableColumn[] {
    return [
      {
        key: 'property_category',
        cell: {
          type: 'string',
          label: { title: { label: 'Type' } }
        }
      },
      {
        key: 'city',
        cell: {
          type: 'string',
          sort: { priority: 1 },
          label: { title: { label: 'Ville' } },
          filter: {
            list: this.buildCityFilters(prospections),
            function: (values: NzTableFilterValue, row: NzUiTableRow) => {
              if (row.cells[0]) {
                return (values as string[]).includes((row.cells[0] as NzUiCell)!.label!.title!.label! as string);
              } else {
                return false;
              }
            }
          }
        }
      },
      {
        key: 'zip',
        cell: {
          type: 'string',
          sort: { priority: 2 },
          label: { title: { label: 'Code postal' } }
        }
      },
      {
        key: 'address',
        cell: {
          type: 'string',
          label: { title: { label: 'Rue' } }
        }
      },
      {
        key: 'link',
        cell: {
          type: 'string',
          label: { title: { label: 'Lien' } }
        }
      },
      {
        key: 'seller',
        cell: {
          type: 'string',
          label: { title: { label: 'Vendeur' } }
        }
      },
      {
        key: 'price',
        cell: {
          type: 'number',
          sort: { priority: 3 },
          label: { title: { label: 'Prix' } }
        }
      },
      {
        key: 'status',
        cell: {
          type: 'string',
          label: { title: { label: 'Statut' } },
          sort: this.buildStatusSorting(),
          filter: this.buildStatusFilter()
        },
      },
      {
        key: 'actions',
        cell: {
          type: 'dropdown-actions-icon',
          dropdown: this.buildColumnActions()
        }
      }
    ];
  }

  createRows(prospections: Prospection_Dto[], sellers: Seller_Dto[]): UiTableRow[] {
    return prospections.map(prospection => this.formatUiTableRow(prospection, sellers));
  }

  getUpdatableValue(sellers: Seller_Dto[], key: string, cell: UiCellBasic | UiCellDropdown): Partial<Prospection_Dto> {
    if (key === 'seller') {
      const seller = sellers.find(seller => seller.name === (cell as UiCellDropdown)!.dropdown!.label!.title!.label);
      if (!seller) throw new Error('Seller not found');
      return { seller_id: seller.id };
    } else if (key === 'status') {
      const status = PROSPECTION_STATUS.find(status => status.shortLabel === (cell as UiCellDropdown)!.dropdown!.label!.title!.label);
      if (!status) throw new Error('Status not found');
      return { status: status.key };
    } else if (key === 'property_category') {
      const iconName = (cell as UiCellDropdown)!.dropdown!.label!.icon!.name as PropertyCategory;
      return { property_category: iconName };
    } else {
      return { [key]: (cell as UiCellBasic)!.label!.title!.label };
    }
  }

  private formatUiTableRow(prospection: Prospection_Dto, sellers: Seller_Dto[]): ProspectionTableRow {
    return {
      data: { id: prospection.id || '' },
      cells: {
        property_category: this.getPropertyCategory(prospection),
        city: {
          editable: true,
          type: 'string',
          label: { title: { label: prospection.city || '' } }
        },
        zip: {
          editable: true,
          type: 'string',
          label: { title: { label: prospection.zip || '' } }
        },
        address: {
          editable: true,
          type: 'string',
          label: { title: { label: prospection.address || '' } }
        },
        link: {
          editable: true,
          type: 'string',
          label: { title: { label: prospection.link || '' } }
        },
        seller: {
          editable: true,
          type: 'dropdown-select',
          dropdown: this.buildSellerDropdown(sellers, prospection)
        },
        price: {
          editable: true,
          type: 'number',
          label: { title: { label: prospection.price?.toString() || '' } }
        },
        status: {
          editable: true,
          type: 'dropdown-select',
          dropdown: this.buildStatusDropdown(prospection)
        },
        actions: {
          type: 'dropdown-actions-icon',
          dropdown: this.buildRowActions()
        }
      }
    };
  }

  private getPropertyCategory(prospection: Prospection_Dto): UiCellDropdown {
    return {
      editable: true,
      type: 'dropdown-select',
      dropdown: {
        labelMatrix: {
          icon: true,
          title: false
        },
        label: { icon: { name: prospection.property_category || 'building', size: 24, color: 'var(--color-secondary-500)' } },
        list: [
          { label: { icon: { name: 'parking', size: 24, color: 'var(--color-secondary-500)' }, title: { label: this.localization.getLocalization('propertyCategories', 'parking') } } },
          { label: { icon: { name: 'terran', size: 24, color: 'var(--color-secondary-500)' }, title: { label: this.localization.getLocalization('propertyCategories', 'terran') } } },
          { label: { icon: { name: 'box', size: 24, color: 'var(--color-secondary-500)' }, title: { label: this.localization.getLocalization('propertyCategories', 'box') } } },
          { label: { icon: { name: 'estate', size: 24, color: 'var(--color-secondary-500)' }, title: { label: this.localization.getLocalization('propertyCategories', 'estate') } } },
          { label: { icon: { name: 'building', size: 24, color: 'var(--color-secondary-500)' }, title: { label: this.localization.getLocalization('propertyCategories', 'building') } } },
          { label: { icon: { name: 'flat', size: 24, color: 'var(--color-secondary-500)' }, title: { label: this.localization.getLocalization('propertyCategories', 'flat') } } }
        ]
      }
    }
  }

  private buildSellerDropdown(sellers: Seller_Dto[], prospection: Prospection_Dto) {
    return {
      label: {
        title: { label: sellers?.find(s => s.id === prospection.seller_id)?.name || '' }
      },
      list: sellers.map(seller => ({
        label: {
          title: { label: seller.name }
        }
      }))
    }
  }

  private buildStatusDropdown(prospection: Prospection_Dto): UiNestedDropdown {

    const targetStatus = PROSPECTION_STATUS.find(status => status.key === prospection.status);

    return {
      label: {
        title: { label: targetStatus?.shortLabel || '', color: 'var(--color-basic-100)' },
        icon: { name: targetStatus?.icon || 'add', size: 16, color: 'var(--color-basic-100)' },
        color: targetStatus?.color || ''
      },
      list: PROSPECTION_STATUS.map(status => ({
        label: {
          title: { label: status.shortLabel },
          icon: { name: status.icon, size: 24, color: status.color },
        }
      }))
    }
  }

  private buildRowActions(): UiNestedDropdown {
    return {
      label: {
        icon: { name: 'down', size: 18, color: 'var(--color-tertiary-500)' },
      },
      list: [
        {
          label: {
            icon: { name: 'trash', size: 18, color: 'var(--color-error-300)' },
            title: { label: 'supprimer' },
            command: () => {
              console.log('implement delete command here');
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
            icon: { name: 'add', size: 22, color: 'var(--color-secondary-500)' },
            title: { label: this.localization.getLocalization('prospections', 'create') },
            command: () => {
              console.log('implement add command here');
              return true;
            }
          },
        }
      ]
    }
  }

  private buildCityFilters(prospections: Prospection_Dto[]): { text: string, value: string }[] {
    return prospections
      .filter(p => p.city && p.city !== '')
      .map(p => ({ text: p.city as string, value: p.city as string }))
      .reduce((unique, item) => {
        return unique.find(i => i.value === item.value) ? unique : [...unique, item];
      }, [] as { text: string, value: string }[])
  }

  private buildStatusFilter() {
    return {
      list: this.buildStatusFilters(),
      function: (values: NzTableFilterValue, row: NzUiTableRow) => {
        if (row.cells[6]) {
          const shortLabel = (row.cells[6] as UiCellDropdown).dropdown?.label?.title?.label as string || '';
          const key = PROSPECTION_STATUS.find(status => status.shortLabel === shortLabel)?.key;
          return (values as string[]).includes(key!);
        } else {
          return false;
        }
      }
    }
  }

  private buildStatusSorting() {
    return {
      function: (a: NzUiTableRow, b: NzUiTableRow) => {
        const shortLabelA = a.cells[6].dropdown?.label?.title?.label as string || '';
        const shortLabelB = b.cells[6].dropdown?.label?.title?.label as string || '';
        return shortLabelA.localeCompare(shortLabelB);
      },
      priority: 1
    }
  }

  private buildStatusFilters(): { text: string, value: string }[] {

    const statusList = PROSPECTION_STATUS.map(status => ({ text: status.shortLabel, value: status.key }));

    return statusList;
  }

}
