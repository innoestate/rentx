import { Injectable } from "@angular/core";
import { Lodger } from "src/app/features/lodgers/models/lodger.model";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { UiTableColumnItem } from "src/app/ui/components/ui-table/models/ui-table.column.model";
import { LodgersCommandsService } from "../commands/lodgers.commands.service";
import { getUpdatedFields as getUpdatedFieldsUtils} from '../../../shared/utils/objects.utils';

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
        label: 'actions',
        type: "text",
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

  buildUpdateFields(row: UiTableRow, lodgers: Lodger[]): Partial<Lodger> {
    const lodger = lodgers.find(o => o.id === row.data.id);
    if (!lodger) throw new Error('Lodger not found');
    const potentialUpdates = row.cells as any;
    const updates = getUpdatedFieldsUtils(lodger, potentialUpdates);
    updates['id'] = lodger.id;
    return updates;
  }

}
