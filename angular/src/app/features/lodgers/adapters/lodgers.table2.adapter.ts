import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { Lodger } from "src/app/features/lodgers/models/lodger.model";
import { UiNestedDropdown2 } from "src/app/ui/components/ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiTable2Row } from "src/app/ui/components/ui-table-2/models/ui-table-row.model";
import { UiTable2Column } from "src/app/ui/components/ui-table-2/models/ui-table.column.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { getUpdatedFields as getUpdatedFieldsUtils } from '../../../shared/utils/objects.utils';

@Injectable({
  providedIn: 'root'
})
export class LodgersTable2AdapterService {

  constructor(private localization: LocalizationsService) { }

  createColumns(): UiTable2Column[] {
    return [
      {
        key: 'name',
        cell: { type: 'mediumString', sort: { priority: 1 }, label: { title: { label: 'Nom Prénom' } } },
      },
      {
        key: 'email',
        cell: { type: 'string', sort: { priority: 2 }, label: { title: { label: 'Email' } } },
      },
      {
        key: 'actions',
        cell: { type: 'dropdown-actions-icon', dropdown: this.buildColumnActions() },
      }
    ];
  }

  createRows(Lodgers: Lodger[]): UiTable2Row[] {
    return Lodgers.map(Lodger => this.formatUiTableRow(Lodger));
  }

  private buildRowActions(): UiNestedDropdown2 {
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

  private buildColumnActions(): UiNestedDropdown2 {
    return {
      label: {
        icon: { name: 'gear', size: 24, color: 'var(--color-secondary-500)' },
      },
      list: [
        {
          label: {
            icon: { name: 'add-lodger', size: 22, color: 'var(--color-secondary-500)'},
            title: { label: this.localization.getLocalization('lodgers', 'create') },
            command: () => {
              console.log('implement command here');
              return true;
            }
          },
        }
      ]
    }

  }

  formatUiTableRow(lodger: Lodger): UiTable2Row {
    return {
      data: { id: lodger.id },
      cells: {
        name: { type: 'string', editable: true,label: { title: { label: lodger.name }} },
        email: { type: 'string', editable: true, label: { title: { label: lodger.email??'' }} },
        actions: { type: 'dropdown-actions', dropdown: this.buildRowActions() },
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
