import { Component, computed, ElementRef, Signal, signal } from '@angular/core';
import { catchError, of, take } from 'rxjs';
import { LocalizationsService } from 'src/app/core/localizations/localizations.service';
import { OwnersTable2AdapterService } from 'src/app/features/owners/adapters/table/owners.table2.adapter';
import { OwnersDataService } from 'src/app/features/owners/data/owners.data.service';
import { Owner } from 'src/app/features/owners/models/owner.model';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiTable2Row } from 'src/app/ui/components/ui-table-2/models/ui-table-row.model';
import { UiTable2Column } from 'src/app/ui/components/ui-table-2/models/ui-table.column.model';
import { UiTable2 } from 'src/app/ui/components/ui-table-2/models/ui-table.model';
import { DesktopOwnersCommandsService } from '../../commands/desktop.owners.command';

@Component({
  selector: 'app-desktop-owners-table',
  standalone: false,
  templateUrl: './desktop-owners-table.component.html',
  styleUrl: './desktop-owners-table.component.scss'
})
export class DesktopOwnersTableComponent extends UiDisplayerComponent {

  owners = this.ownersData.getOwners();
  table: UiTable2 = {
    columns: signal<UiTable2Column[]>(this.adapter.createColumns()),
    rows: this.getRows(),
    title: this.localization.getLocalization('owners', 'tableTitle'),
    commands: [
      {
        name: 'add-owner',
        size: 26,
        color: 'var(--color-secondary-500)',
        command: () => this.ownersCommands.createOwner()
      },
    ]
  };

  constructor(
    private ownersData: OwnersDataService,
    private adapter: OwnersTable2AdapterService,
    private localization: LocalizationsService,
    private ownersCommands: DesktopOwnersCommandsService,
    protected override elRef: ElementRef,
  ) {
    super(elRef);
  }

  getRows(): Signal<UiTable2Row[]> {
    return computed(() => {
      const rows = this.adapter.createRows(this.owners());
      this.bindColumnsCommands(this.table.columns());
      this.bindRowsCommands(rows);
      return rows;
    })
  }

  bindColumnsCommands(columns: UiTable2Column[]) {
    columns.find(c => c.key === 'actions')!.cell.dropdown!.list![0].label!.command = () => this.ownersCommands.createOwner();
  }

  bindRowsCommands(rows: UiTable2Row[]) {
    rows.forEach(row => {
      const id = row.data.id;
      row.cells['actions']!.dropdown!.list![0].label!.command = () => this.ownersCommands.deleteOwner(id);
    });
  }

  updateCell(event: { id: string, updates: Partial<Owner> }) {
    this.ownersData.updateOwner(event.id!, event.updates).pipe(
      take(1),
      catchError(() => this.reloadOwnerForResetCellPreviusValue(event.id))
    ).subscribe();
  }

  reloadOwnerForResetCellPreviusValue(id: string){
    const oldOwner = this.owners().find(o => o.id === id);
    this.ownersData.updateOwner(id, { ...oldOwner! });
    return of(null);
  }
}
