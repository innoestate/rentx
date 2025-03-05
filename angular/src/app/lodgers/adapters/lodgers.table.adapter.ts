import { Injectable } from "@angular/core";
import { Lodger } from "src/app/core/models/lodger.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { LodgersCommandsService } from "../commands/lodgers.commands.service";


@Injectable({
  providedIn: 'root'
})
export class LodgersTableAdapterService {

  constructor(private lodgersCommands: LodgersCommandsService) { }

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
        label: 'Nom Prénom'
      },
      {
        key: 'email',
        label: 'Email',
        editable: true
      },
      {
        key: 'actions',
        label: 'actions',
      }
    ];
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
          icon: 'delete',
          label: 'delete',
          value: lodger.id,
          command: () => {
            this.lodgersCommands.deleteLodger(lodger.id);
            return true;
          }
        }
      },

    }
  }

  getUpdatedFields(row: UiTableRow, lodgers: Lodger[]): Partial<Lodger> {
    const lodger = lodgers.find(o => o.id === row.data.id);
    if (!lodger) throw new Error('Lodger not found');
    const fieldsToCheck = ['email'];
    const updates = {id: lodger.id};
    return fieldsToCheck.reduce((acc, field) => (row.cells[field] !== (lodger as any)[field]) ? {...acc, [field]: row.cells[field]} : acc, updates);
  }

}
