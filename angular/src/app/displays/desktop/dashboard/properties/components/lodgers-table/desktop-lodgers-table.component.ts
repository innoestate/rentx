import { Component, computed, ElementRef, Signal, signal } from '@angular/core';
import { catchError, of, take } from 'rxjs';
import { LodgersTableAdapterService } from 'src/app/features/lodgers/adapters/lodgers.table.adapter';
import { LodgersDataService } from 'src/app/features/lodgers/data/lodgers.data.service';
import { Lodger } from 'src/app/features/lodgers/models/lodger.model';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiTable2Column } from 'src/app/ui/components/ui-table/models/ui-table.column.model';
import { UiTable2 } from 'src/app/ui/components/ui-table/models/ui-table.model';
import { DesktopLodgersCommandsService } from '../../commands/deskop.lodgers.command';
import { UiTable2Row } from 'src/app/ui/components/ui-table/models/ui-table-row.model';
import { LocalizationsService } from 'src/app/core/localizations/localizations.service';
import { UiCell } from 'src/app/ui/components/ui-table/models/ui-cell.model';

@Component({
  selector: 'app-desktop-lodgers-table',
  standalone: false,
  templateUrl: './desktop-lodgers-table.component.html',
  styleUrl: './desktop-lodgers-table.component.scss'
})
export class DesktopLodgersTableComponent extends UiDisplayerComponent {

  lodgers = this.lodgerData.getLodgers();
  table2: UiTable2 = {
    columns: signal<UiTable2Column[]>(this.adapter.createColumns()),
    rows: this.getRows(),
    title: this.localization.getLocalization('lodgers', 'tableTitle'),
    commands: [
      {
        name: 'add-lodger',
        size: 26,
        color: 'var(--color-secondary-500)',
        command: () => this.lodgersCommands.createLodger()
      },
    ]
  }

  constructor(private lodgerData: LodgersDataService,
    private adapter: LodgersTableAdapterService,
    protected override elRef: ElementRef,
    private localization: LocalizationsService,
    private lodgersCommands: DesktopLodgersCommandsService) {
    super(elRef);
  }

  getRows(): Signal<UiTable2Row[]> {
    return computed(() => {
      const rows = this.adapter.createRows(this.lodgers());
      this.bindColumnsCommands(this.table2.columns());
      this.bindRowsCommands(rows);
      return rows;
    })
  }

  bindColumnsCommands(columns: UiTable2Column[]) {
    columns.find(c => c.key === 'actions')!.cell.dropdown!.list![0].label!.command = () => this.lodgersCommands.createLodger();
  }

  bindRowsCommands(rows: UiTable2Row[]) {
    rows.forEach(row => {
      const id = row.data.id;
      row.cells['actions']!.dropdown!.list![0].label!.command = () => this.lodgersCommands.deleteLodger(id);
    });
  }

  updateCell(event: { id: string, key: string, cell: UiCell }) {
    const value = this.adapter.getEditableValue(event.key, event.cell);
    this.lodgerData.updateLodger(event.id!, value).pipe(
      take(1),
      catchError(() => this.reloadLodgerForResetCellPreviusValue(event.id))
    ).subscribe();
  }

  reloadLodgerForResetCellPreviusValue(id: string){
    const oldLodger = this.lodgers().find(l => l.id === id);
    this.lodgerData.updateLodger(id, { ...oldLodger! });
    return of(null);
  }

}
