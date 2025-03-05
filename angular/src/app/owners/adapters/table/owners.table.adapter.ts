import { Injectable } from "@angular/core";
import { Owner } from "src/app/core/models/owner.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { OwnersCommandsService } from "../../commands/owners.command.service";

@Injectable({
  providedIn: 'root'
})
export class OwnersTableAdapterService {

  constructor(private ownersCommands: OwnersCommandsService) { }

  buildTable(owners: Owner[]): { columns: UiTableColumnItem[], rows: UiTableRow[] }  {

    const columns = this.createColumns();
    const rows = this.createRows(owners);

    return {
      columns,
      rows
    }
  }

  private createColumns(): UiTableColumnItem[] {
    return [
      {
        label: "Nom Prénom / raison sociale",
        key: "name"
      },
      {
        label: "Adresse",
        key: "address",
        editable: true
      },
      {
        label: "Code Postal",
        key: "zip",
        editable: true
      },
      {
        label: "Ville",
        key: "city",
        editable: true
      },
      {
        label: "email",
        key: "email",
        editable: true
      },
      {
        label: "telephone",
        key: "phone",
        editable: true
      },
      {
        label: "actions",
        key: "actions"
      }
    ];
  }

  private createRows(owners: Owner[]): UiTableRow[] {
    return owners.map(owner => this.formatUiTableRow(owner));
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
          label: "",
          icon: "delete",
          command: () => {
            this.ownersCommands.deleteOwner(owner.id);
            return true;
          }
        }
      }
    }
  }

  getUpdatedFields(row: UiTableRow, owners: Owner[]): Partial<Owner> {
    const owner = owners.find(o => o.id === row.data.id);
    if (!owner) throw new Error('Owner not found');
    const fieldsToCheck = ['name', 'street', 'zip', 'city', 'email', 'phone'];
    const updates = {id: owner.id};
    return fieldsToCheck.reduce((acc, field) => (row.cells[field] !== (owner as any)[field]) ? {...acc, [field]: row.cells[field]} : acc, updates);
  }

}
