import { Injectable } from "@angular/core";
import { LocalizationsService } from "src/app/core/localizations/localizations.service";
import { Owner } from "src/app/features/owners/models/owner.model";
import { getUpdatedFields as getUpdatedFieldsUtils } from "src/app/shared/utils/objects.utils";
import { UiNestedDropdown } from "src/app/ui/components/ui-nested-dropdown/model/ui-nested-dropdown.model";
import { UiTableAdapter } from "src/app/ui/components/ui-table/adapter/ui-table.adapter";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";


@Injectable({
  providedIn: 'root'
})
export class OwnersTableAdapterService extends UiTableAdapter {

  constructor(private localization: LocalizationsService) {
    super();
  }

  buildTable(owners: Owner[]): UiTable {
    return {
      columns: this.createColumns(owners),
      rows: this.createRows(owners),
      title: this.localization.getLocalization('owners', 'tableTitle'),
      commands: [{
        icon: 'add-owner',
        label: this.localization.getLocalization('owners', 'create'),
        command: () => { }
      }]
    }
  }

  createColumns(owners: Owner[]): UiTableColumnItem[] {
    return [
      {
        label: "Nom Prénom / raison sociale",
        key: "name",
        type: 'text'
      },
      {
        label: "Adresse",
        key: "street",
        editable: true,
        type: 'text'
      },
      {
        label: "Code Postal",
        key: "zip",
        editable: true,
        type: 'text'
      },
      {
        label: "Ville",
        key: "city",
        editable: true,
        type: 'text'
      },
      {
        label: "email",
        key: "email",
        editable: true,
        type: 'text'
      },
      {
        label: "telephone",
        key: "phone",
        editable: true,
        type: 'text',
      },
      {
        key: 'actions',
        label: '',
        icon: 'gear',
        type: 'dropdown',
        dropdown: this.buildActionsDropDownItems(owners),
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

  createRows(owners: Owner[]): UiTableRow[] {
    return owners.map(owner => this.formatUiTableRow(owner));
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

  getDtoFromRow(row: UiTableRow): any {
    return null;
  }

  private buildActionsDropDownItems(owners: Owner[]): UiNestedDropdown {
    return {
      list: [
        {
          label: "Editer",
          icon: "edit-file",
          iconSize: 22,
          color: 'var(--color-secondary-500)',
          value: "edit",
          command: (row: UiTableRow) => {
            const owner = owners.find(o => o.id === row.data.id);
            if (!owner) throw new Error('Owner not found');
            return true;
          }
        },
        {
          label: 'delete',
          icon: 'trash',
          value: "delete",
          iconSize: 16,
          color: 'var(--color-error-600)',
          command: (row: UiTableRow) => {
            return true;
          }
        }
      ]
    }
  }

  formatUiTableRow(owner: Owner): UiTableRow {
    return {
      data: { id: owner.id },
      cells: {
        name: owner.name,
        street: owner.street,
        zip: owner.zip,
        city: owner.city,
        email: owner.email,
        phone: owner.phone,
        actions: {
          value: "",
          label: "action",
          icon: "trash",
        }
      }
    }
  }

  buildUpdateFields(row: UiTableRow, owners: Owner[]): Partial<Owner> {
    const owner = owners.find(o => o.id === row.data.id);
    if (!owner) throw new Error('Owner not found');
    const potentialUpdates = row.cells as any;
    const updates = getUpdatedFieldsUtils(owner, potentialUpdates);
    updates['id'] = owner.id;
    return updates;
  }

}
