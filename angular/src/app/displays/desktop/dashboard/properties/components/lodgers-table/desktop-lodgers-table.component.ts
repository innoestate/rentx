import { Component, computed, ElementRef, Signal, signal } from '@angular/core';
import { catchError, of, take } from 'rxjs';
import { LodgersTable2AdapterService } from 'src/app/features/lodgers/adapters/lodgers.table2.adapter';
import { LodgersDataService } from 'src/app/features/lodgers/data/lodgers.data.service';
import { Lodger } from 'src/app/features/lodgers/models/lodger.model';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiTable2Column } from 'src/app/ui/components/ui-table-2/models/ui-table.column.model';
import { UiTable2 } from 'src/app/ui/components/ui-table-2/models/ui-table.model';
import { DesktopLodgersCommandsService } from '../../commands/deskop.lodgers.command';
import { UiTable2Row } from 'src/app/ui/components/ui-table-2/models/ui-table-row.model';

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
    rows: this.getRows()
  }

  constructor(private lodgerData: LodgersDataService,
    private adapter: LodgersTable2AdapterService,
    protected override elRef: ElementRef,
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

  updateCell(event: { id: string, updates: Partial<Lodger> }) {
    this.lodgerData.updateLodger(event.id!, event.updates).pipe(
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
