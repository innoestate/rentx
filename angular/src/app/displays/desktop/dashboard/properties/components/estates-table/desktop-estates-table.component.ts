import { Component, computed, effect, ElementRef, Signal, signal } from '@angular/core';
import { catchError, of, take } from 'rxjs';
import { LocalizationsService } from 'src/app/core/localizations/localizations.service';
import { fillEstates } from 'src/app/features/estates/adapters/estate.adapter.utils';
import { EstatesTable2AdapterService } from 'src/app/features/estates/adapters/estates.table2.adapter';
import { Estate } from 'src/app/features/estates/models/estate.model';
import { LodgersDataService } from 'src/app/features/lodgers/data/lodgers.data.service';
import { OwnersDataService } from 'src/app/features/owners/data/owners.data.service';
import { RentsDataService } from 'src/app/features/rents/data/service/rents.data.service';
import { UiDisplayerComponent } from 'src/app/ui/components/ui-displayer/ui-displayer.component';
import { UiTable2Row } from 'src/app/ui/components/ui-table-2/models/ui-table-row.model';
import { UiTable2Column } from 'src/app/ui/components/ui-table-2/models/ui-table.column.model';
import { UiTable2 } from 'src/app/ui/components/ui-table-2/models/ui-table.model';
import { DesktopEstatesCommandsService } from '../../commands/desktop.estates.command';
import { EstatesDataService } from 'src/app/features/estates/data/service/esates.data.service';
import { UiCell } from 'src/app/ui/components/ui-table-2/models/ui-cell.model';

@Component({
  selector: 'app-desktop-estates-table',
  standalone: false,
  templateUrl: './desktop-estates-table.component.html',
  styleUrl: './desktop-estates-table.component.scss'
})
export class DesktopEstatesTableComponent extends UiDisplayerComponent {


  table: UiTable2 = {
    columns: signal<UiTable2Column[]>(this.adapter.createColumns()),
    rows: this.getRows(),
    title: this.localization.getLocalization('estates', 'tableTitle'),
    commands: [
      {
        name: 'add-estate',
        size: 26,
        color: 'var(--color-secondary-500)',
        command: () => this.estatesCommands.createEstate()
      },
    ]
  };

  estatesDto = this.estatesData.getEstates();
  ownersDto = this.ownersData.getOwners();
  lodgersDto = this.lodgersData.getLodgers();
  monthlyRentsDto = this.monthlyRentsData.get();

  estates = computed(() => fillEstates(this.estatesDto(), this.ownersDto(), this.lodgersDto(), this.monthlyRentsDto()));


  constructor(
    private estatesData: EstatesDataService,
    private ownersData: OwnersDataService,
    private lodgersData: LodgersDataService,
    private monthlyRentsData: RentsDataService,
    private adapter: EstatesTable2AdapterService,
    private localization: LocalizationsService,
    private estatesCommands: DesktopEstatesCommandsService,
    protected override elRef: ElementRef,
  ) {
    super(elRef);
  }

  getRows(): Signal<UiTable2Row[]> {
    return computed(() => {
      const rows = this.adapter.createRows(this.estates(), this.ownersDto(), this.lodgersDto());
      this.bindColumnsCommands(this.table.columns());
      this.bindRowsCommands(rows);
      return rows;
    })
  }

  bindColumnsCommands(columns: UiTable2Column[]) {
    columns.find(c => c.key === 'actions')!.cell.dropdown!.list![0].label!.command = () => this.estatesCommands.createEstate();
  }

  bindRowsCommands(rows: UiTable2Row[]) {
    rows.forEach(row => {
      const id = row.data.id;
      row.cells['actions']!.dropdown!.list![0].label!.command = () => this.estatesCommands.deleteEstate(id);
    });
  }

  updateCell(event: { id: string, key: string, cell: UiCell }) {
    const value = this.adapter.getEditableValue(this.ownersDto(), this.lodgersDto(), event.key, event.cell);
    this.estatesData.updateEstate(event.id!, value).pipe(
      take(1),
      catchError(() => this.reloadEstateForResetCellPreviusValue(event.id))
    ).subscribe();
  }

  reloadEstateForResetCellPreviusValue(id: string) {
    const oldEstate = this.estates().find((e: Estate) => e.id === id);
    this.estatesData.updateEstate(id, { ...oldEstate! });
    return of(null);
  }

}

