import { Component, ElementRef, computed, signal } from '@angular/core';
import { SellersTableAdapterService } from 'src/app/features/sellers/adapters/sellers.table.adapter';
import { SellersDataService } from 'src/app/features/sellers/data/services/sellers.data.service';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiTable2 } from 'src/app/ui/components/ui-table/models/ui-table.model';
import { SellersCommandsService } from 'src/app/features/sellers/commands/table/sellers.commands.service';
import { UiTable2Row } from 'src/app/ui/components/ui-table/models/ui-table-row.model';
import { UiCell } from 'src/app/ui/components/ui-table/models/ui-cell.model';
import { catchError, of, take } from 'rxjs';

@Component({
  selector: 'app-desktop-sellers-table',
  standalone: false,
  templateUrl: './desktop-sellers-table.component.html',
  styleUrls: ['./desktop-sellers-table.component.scss']
})
export class DesktopSellersTableComponent extends UiDisplayerComponent {

  sellers = this.sellersData.getSellers();
  table: UiTable2 = {
    columns: signal(this.adapter.createColumns()),
    rows: this.getRows(),
    title: 'Table des vendeurs',
    commands: this.getCommands()
  };

  constructor(
    private sellersData: SellersDataService,
    private adapter: SellersTableAdapterService,
    private sellersCommands: SellersCommandsService,
    protected override elRef: ElementRef,
  ) {
    super(elRef);
  }

  getRows() {
    return computed(() => {
      const rows = this.adapter.createRows(this.sellers());
      this.bindColumnsCommands(this.table.columns());
      this.bindRowsCommands(rows);
      return rows;
    });
  }

  getCommands() {
    return [
      {
        name: 'add',
        size: 26,
        color: 'var(--color-secondary-500)',
        command: () => this.sellersCommands.createNew()
      },
    ];
  }

  bindColumnsCommands(columns: any[]) {
    columns.find(c => c.key === 'actions')!.cell.dropdown!.list![0].label!.command = () => this.sellersCommands.createNew();
  }

  bindRowsCommands(rows: UiTable2Row[]) {
    rows.forEach(row => {
      const id = row.data.id;
      row.cells['actions']!.dropdown!.list![0].label!.command = () => this.sellersCommands.delete(id);
    });
  }

  updateCell(event: { id: string, key: string, cell: UiCell }) {
    const value = this.adapter.getEditableValue(event.key, event.cell);
    this.sellersData.updateSeller(event.id!, value).pipe(
      take(1),
      catchError(() => this.reloadSellerForResetCellPreviousValue(event.id))
    ).subscribe();
  }

  reloadSellerForResetCellPreviousValue(id: string) {
    const oldSeller = this.sellers().find((s: any) => s.id === id);
    this.sellersData.updateSeller(id, { ...oldSeller! });
    return of(null);
  }
}
