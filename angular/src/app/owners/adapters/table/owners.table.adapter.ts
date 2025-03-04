import { Injectable } from "@angular/core";
import { Owner } from "src/app/core/models/owner.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { OwnersCommands } from "../../commands/owners.command";

@Injectable({
  providedIn: 'root'
})
export class OwnersTableAdapter {

  constructor(private ownersCommands: OwnersCommands) { }

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
        key: "address"
      },
      {
        label: "Code Postal",
        key: "zip"
      },
      {
        label: "Ville",
        key: "city"
      },
      {
        label: "email",
        key: "email"
      },
      {
        label: "telephone",
        key: "phone"
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

  private formatUiTableRow(owner: Owner): UiTableRow {
    return {
      data: { id: owner.id },
      cells: {
        name: owner.name,
        address: owner.street,
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

}
