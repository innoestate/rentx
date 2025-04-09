import { Injectable } from "@angular/core";
import { Owner } from "src/app/features/owners/models/owner.model";
import { getUpdatedFields as getUpdatedFieldsUtils } from "src/app/shared/utils/objects.utils";
import { UiNestedDropdown } from "src/app/ui/components/ui-nested-dropdown/model/ui-nested-dropdown.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { OwnersCommandsService } from "../../commands/owners.command.service";


@Injectable({
  providedIn: 'root'
})
export class OwnersTableAdapterService {

  constructor(private ownersCommands: OwnersCommandsService) { }

  buildTable(owners: Owner[]): { columns: UiTableColumnItem[], rows: UiTableRow[] }  {

    const columns = this.createColumns(owners);
    const rows = this.createRows(owners);

    return {
      columns,
      rows
    }
  }

  private createColumns(owners: Owner[]): UiTableColumnItem[] {
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
        label: "actions",
        key: "actions",
        type: 'text',
        dropdown: this.buildActionsDropDownItems(owners)
      }
    ];
  }

  private createRows(owners: Owner[]): UiTableRow[] {
    return owners.map(owner => this.formatUiTableRow(owner));
  }

  private buildActionsDropDownItems(owners: Owner[]): UiNestedDropdown {
    return {
      list: [
        {
          label: "Editer",
          icon: "edit",
          value: "edit",
          command: (row: UiTableRow) => {
            const owner = owners.find(o => o.id === row.data.id);
            if (!owner) throw new Error('Owner not found');
            this.ownersCommands.editOwner(owner);
            return true;
          }
        },
        {
          label: "Supprimer",
          icon: "trash",
          value: "delete",
          command: (row: UiTableRow) => {
            this.ownersCommands.deleteOwner(row.data.id);
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
