import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { Owner } from "src/app/features/owners/models/owner.model";
import { UiNestedDropdown2 } from "src/app/ui/components/ui-nested-dropdown-actions/model/ui-nested-dropdown-actions.model";
import { UiCell } from "src/app/ui/components/ui-table-2/models/ui-cell.model";
import { UiTable2Row } from "src/app/ui/components/ui-table-2/models/ui-table-row.model";
import { UiTable2Column } from "src/app/ui/components/ui-table-2/models/ui-table.column.model";

@Injectable({
  providedIn: 'root'
})
export class OwnersTable2AdapterService {

  constructor(private localization: LocalizationsService) { }

  createColumns(): UiTable2Column[] {
    return [
      {
        key: 'name',
        cell: { type: 'mediumString', sort: { priority: 1 }, label: { title: { label: 'Nom Prénom / raison sociale' } } },
      },
      {
        key: 'street',
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
        key: 'actions',
        cell: { type: 'dropdown-actions-icon', dropdown: this.buildColumnActions() },
      }
    ];
  }

  createRows(owners: Owner[]): UiTable2Row[] {
    return owners.map(owner => this.formatUiTableRow(owner));
  }

  getEditableValue(key: string, cell: UiCell): Partial<Owner> {
    const updates: any = {};
    updates[key] = cell.label?.title?.label;
    return updates;
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
            icon: { name: 'add-owner', size: 22, color: 'var(--color-secondary-500)'},
            title: { label: this.localization.getLocalization('owners', 'create') },
            command: () => {
              console.log('implement command here');
              return true;
            }
          },
        }
      ]
    }
  }

  formatUiTableRow(owner: Owner): UiTable2Row {
    return {
      data: { id: owner.id },
      cells: {
        name: { type: 'string', editable: true, label: { title: { label: owner.name }} },
        street: { type: 'string', editable: true, label: { title: { label: owner.street ?? '' }} },
        zip: { type: 'string', editable: true, label: { title: { label: owner.zip ?? '' }} },
        city: { type: 'string', editable: true, label: { title: { label: owner.city ?? '' }} },
        email: { type: 'string', editable: true, label: { title: { label: owner.email ?? '' }} },
        phone: { type: 'string', editable: true, label: { title: { label: owner.phone ?? '' }} },
        actions: { type: 'dropdown-actions', dropdown: this.buildRowActions() },
      },
    }
  }
}
