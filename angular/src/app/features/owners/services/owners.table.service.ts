import { computed, Directive, Injectable, Injector, Signal } from "@angular/core";
import { take, tap } from "rxjs";
import { UiTableRow } from "src/app/ui/components/ui-table/models/ui-table-row.model";
import { OwnersTableAdapterService } from "../adapters/table/owners.table.adapter";
import { OwnersDataService } from "../data/owners.data.service";
import { UiTable } from "src/app/ui/components/ui-table/models/ui-table.model";
import { OwnersCommandsService } from "../commands/owners.command.service";
import { UiTableInterface } from "src/app/ui/components/ui-table/interfaces/ui-table.interface";

@Injectable()
export class OwnersTableService implements UiTableInterface {

  owners = this.ownersData.getOwners();
  ownersTable = this.buildTable();

  constructor(protected ownersData: OwnersDataService,
    protected ownersUiAdapter: OwnersTableAdapterService,
    protected ownersCommands: OwnersCommandsService) { }

  buildTable(): Signal<UiTable> {
    return computed(() => {
      const table = this.ownersUiAdapter.buildTable(this.owners())
      this.bindCommands(table);
      return table;
    });
  }

  bindCommands(table: UiTable): UiTable {
    table.commands![0].command = () => this.ownersCommands.createOwner();
    table.columns.find(c => c.key === 'actions')!.headDropdown!.list[0].command = (row: UiTableRow) => this.ownersCommands.createOwner();
    table.columns.find(c => c.key === 'actions')!.dropdown!.list[0].command = (row: UiTableRow) => {
      const owner = this.owners().find(o => o.id === row.data.id);
      if (!owner) throw new Error('Owner not found');
      this.ownersCommands.editOwner(owner);
      return true;
    };
    table.columns.find(c => c.key === 'actions')!.dropdown!.list[1].command = (row: UiTableRow) => this.ownersCommands.deleteOwner(row?.data?.id);
    return table;
  }

  updateRow(row: UiTableRow) {
    const updates = this.ownersUiAdapter.buildUpdateFields(row, this.owners());
    this.ownersData.updateOwner(row.data.id, updates).pipe(
      take(1),
      tap(() => this.reloadOwnerForResetCellPreviusValue(row.data.id))
    )
  }

  reloadOwnerForResetCellPreviusValue(ownerId: string) {
    const oldOwner = this.owners().find(o => o.id === ownerId);
    this.ownersData.updateOwner(ownerId, { ...oldOwner! });
  }
}
