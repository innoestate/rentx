import { Injectable } from "@angular/core";
import { Lodger } from "src/app/features/lodgers/models/lodger.model";
import { UiNestedDropdown } from "src/app/ui/components/ui-nested-dropdown/model/ui-nested-dropdown.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { getUpdatedFields as getUpdatedFieldsUtils } from '../../../shared/utils/objects.utils';

@Injectable({
  providedIn: 'root'
})
export class LodgersTableAdapterService {

  constructor() { }

  buildTable(lodgers: Lodger[]): { columns: UiTableColumnItem[], rows: UiTableRow[] } {
    return {
      columns: this.createColumns(),
      rows: this.createRows(lodgers)
    }
  }

  private createColumns(): UiTableColumnItem[] {
    return [
      {
        key: 'name',
        label: 'Nom Prénom',
        type: "text"
      },
      {
        key: 'email',
        label: 'Email',
        editable: true,
        type: "text"
      },
      {
        key: 'actions',
        label: '',
        icon: 'gear',
        type: 'dropdown',
        dropdown: this.buildActionsDropdownColumn(),
        headDropdown: this.buildActionsHeadDropdown(),
        dropDownCellsUniqueItem: {
          label: '',
          icon: 'down',
          iconSize: 16,
          color: 'var(--color-tertiary-500)',
          value: 'action',
        },
      }
    ];
  }

    private buildActionsDropdownColumn(): UiNestedDropdown {
      return {
        list: [
          {
            label: 'delete',
            icon: 'trash',
            value: "delete",
            color: 'var(--color-basic-900)',
            command: () => {
              console.log('implement command here');
              return true;
            }
          }
        ]
      }
    }

    private buildActionsHeadDropdown(): UiNestedDropdown {
      return {
        fixedHead: {
          label: '',
          icon: 'gear',
          iconSize: 24,
          value: 'action',
          command: () => { }
        },
        list: [
          {
            label: 'create',
            icon: 'add',
            iconSize: 22,
            value: "create",
            command: () => {
              console.log('implement command here');
              return true;
            }
          }
        ]
      }
    }

  private createRows(Lodgers: Lodger[]): UiTableRow[] {
    return Lodgers.map(Lodger => this.formatUiTableRow(Lodger));
  }

  formatUiTableRow(lodger: Lodger): UiTableRow {
    return {
      data: { id: lodger.id },
      cells: {
        name: lodger.name,
        email: lodger.email??'',
        actions: {
          icon: 'trash',
          label: 'delete',
          value: lodger.id,
          command: () => {
            return true;
          }
        }
      },

    }
  }

  buildUpdateFields(row: UiTableRow, lodgers: Lodger[]): Partial<Lodger> {
    const lodger = lodgers.find(o => o.id === row.data.id);
    if (!lodger) throw new Error('Lodger not found');
    const potentialUpdates = row.cells as any;
    const updates = getUpdatedFieldsUtils(lodger, potentialUpdates);
    updates['id'] = lodger.id;
    return updates;
  }

}
